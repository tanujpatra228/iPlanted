import { deleteCurrentSession } from "@/appwrite/appwrite";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const userAgent = request.headers.get('User-Agent');
        const {success} = await deleteCurrentSession(userAgent);
        return Response.json({ deleted: success }, { status: 200 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}