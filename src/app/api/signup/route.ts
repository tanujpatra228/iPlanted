import { ID } from "node-appwrite";
import { createAdminClient } from "@/appwrite/appwrite";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_KEY } from "@/helpers";

export async function POST(request: Request) {
    try {
        const {email, password, name}: any = await request.json();
        const userAgent = request.headers.get("User-Agent");
        const { account } = await createAdminClient(userAgent);
        const user = await account.create(ID.unique(), email, password, name);
        const userSession = await account.createEmailPasswordSession(email, password);
    
        cookies().set(SESSION_KEY, userSession.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return NextResponse.json({
            message: "Signup successful",
            user: user,
            userSession: userSession,
        }, { status: 201 });
    }
    catch (error: any) {
        return NextResponse.json({
            error: error.response
        }, { status: error?.code || 500 });
    }
}