
import { createAdminClient } from "@/appwrite/appwrite";
import { SESSION_KEY } from "@/helpers";
import { setSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId") ?? "";
    const secret = request.nextUrl.searchParams.get("secret") ?? "";
    const userAgent = request.headers.get("User-Agent");

    const { account } = await createAdminClient(userAgent);
    const userSession = await account.createSession(userId, secret);

    setSession(userSession);
    return NextResponse.redirect(`${request.nextUrl.origin}/map`);
}