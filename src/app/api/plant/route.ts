import { createSessionClient } from "@/appwrite/appwrite";
import dbConnect from "@/lib/dbConnect";
import Plant from "@/model/Plant";
import { uploadImage } from "@/services/image.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const coordinatesJson = formData.get('coordinates') as string;
        const coordinates = JSON.parse(coordinatesJson);
        const imageFile = formData.get('image') as Blob;
        const notes = formData.get('notes') as string;
        
        if (!title || !coordinates) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        const userAgent = request.headers.get('User-Agent');
        const { account } = await createSessionClient(userAgent);
        const user = await account.get();
        
        const bytes = await imageFile.arrayBuffer();
        const fileBuffer = Buffer.from(bytes);

        const imageUrl = await uploadImage(fileBuffer);

        await dbConnect();
        const plant = new Plant({
            title: title,
            plantedBy: user.$id,
            image: imageUrl,
            notes: notes,
            location: {
                type: 'Point',
                coordinates: [coordinates?.lng, coordinates?.lat]
            }
        });
        await plant.save();

        return NextResponse.json({ plant: plant }, { status: 201 });
    } catch (error: any) {
        console.log('plant API error', error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const lng = request.nextUrl.searchParams.get('lng');
        const lat = request.nextUrl.searchParams.get('lat');
        // Lat Lng i required
        if(!lng || !lat) return NextResponse.json({ success: false, message: "Coordinates required", lnglat: [lng, lat] }, { status: 404 });
        
        const center = [Number(lng), Number(lat)];
        const earthRadiusInKm = 6371; // approx
        const searchRadius = 1;
        const searchArea = searchRadius/earthRadiusInKm;

        await dbConnect();
        const plants = await Plant.find({
            location: {
                $geoWithin: {
                    $centerSphere: [center, searchArea]
                }
            }
        });
        return NextResponse.json({ success: true, plants: plants }, { status: 200 });
    } catch (error: any) {
        console.log('nearby plant API error', error);
        return NextResponse.json({ success: false, error: true, message: error?.message }, { status: 500 });
    }
}