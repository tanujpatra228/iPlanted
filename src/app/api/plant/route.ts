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
                coordinates: [coordinates?.lat, coordinates?.lng]
            }
        });
        await plant.save();

        return NextResponse.json({ plant: plant }, { status: 201 });
    } catch (error: any) {
        console.log('plant API error', error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const plants = await Plant.find({}, '-__v');
        return NextResponse.json({ plants: plants }, { status: 200 });
    } catch (error: any) {
        console.log('plant API error', error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}