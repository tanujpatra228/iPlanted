import { createSessionClient } from "@/appwrite/appwrite";
import dbConnect from "@/lib/dbConnect";
import Plant from "@/model/Plant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {title, coordinates} = await request.json();
        if (!title || !coordinates) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        const userAgent = request.headers.get('User-Agent');
        const { account } = await createSessionClient(userAgent);
        const user = await account.get();
        
        await dbConnect();
        const plant = new Plant({
            title: title,
            plantedBy: user.$id,
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