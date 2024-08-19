import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_KEY } from "@/helpers";
import { createAdminClient } from "@/appwrite/appwrite";

export async function POST(request: Request) {
    try {
        const { email, password }: any = await request.json();
        const userAgent = request.headers.get("User-Agent");
        const { account } = await createAdminClient(userAgent);
        const userSession = await account.createEmailPasswordSession(email, password);
    
        cookies().set(SESSION_KEY, userSession.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: new Date(userSession.expire),
        });

        return NextResponse.json({
            message: "Signin successful",
            userSession: userSession,
        }, { status: 200 });
    }
    catch (error: any) {
        console.log('login API error', error);
        
        return NextResponse.json({
            error: error.response
        }, { status: error?.code || 500 });
    }
}