import { createAdminClient } from "@/appwrite/appwrite";
import { setSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password }: any = await request.json();
        const userAgent = request.headers.get("User-Agent");
        const { account } = await createAdminClient(userAgent);
        const userSession = await account.createEmailPasswordSession(email, password);
    
        setSession(userSession);
        revalidatePath('/map', 'page');

        return NextResponse.json({
            message: "Signin successful",
        }, { status: 200 });
    }
    catch (error: any) {
        console.log('login API error', error);
        
        return NextResponse.json({
            error: error.response
        }, { status: error?.code || 500 });
    }
}