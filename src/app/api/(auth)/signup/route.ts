import { createAdminClient } from "@/appwrite/appwrite";
import { RegisterFormType } from "@/components/forms/RegisterForm";
import { setSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: Request) {
    try {
        const {email, password, name}: RegisterFormType = await request.json();
        const userAgent = request.headers.get("User-Agent");
        const { account } = await createAdminClient(userAgent);
        const user = await account.create(ID.unique(), email, password, name);
        const userSession = await account.createEmailPasswordSession(email, password);
    
        setSession(userSession);

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