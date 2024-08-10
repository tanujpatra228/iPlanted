"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { createAdminClient } from "@/appwrite/appwrite";

export async function signUpWithGoogle() {
    const origin = headers().get("origin");
    const userAgent = headers().get("User-Agent");
	const { account } = await createAdminClient(userAgent);

  
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Google,
		`${origin}/api/oauth/success`,
		`${origin}/signup`,
	);

	return redirect(redirectUrl);
}