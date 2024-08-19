import { config } from "@/appwrite/config";
import { SESSION_KEY } from "@/helpers";
import { cookies } from "next/headers";
import { Client, Account } from "node-appwrite";

export async function createSessionClient(userAgent: string | null) {
    const client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

    const session = cookies().get(SESSION_KEY);
    if (!session || !session.value) {
        throw new Error("No session");
    }

    if (userAgent) client.setForwardedUserAgent(userAgent);

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient(userAgent: string | null) {
    const client = new Client()
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        .setKey(process.env.APPWRITE_API_KEY!);

    if (userAgent) client.setForwardedUserAgent(userAgent);

    return {
        get account() {
            return new Account(client);
        },
    };
}

// Get Current loggedin user
export async function getCurrentUser() {
    try {
        const { account } = await createSessionClient('');
        return await account.get();
    } catch (error: any) {
        console.log('getCurrentUser error', error);
        return null;
    }
}

// Delete current session
export async function deleteCurrentSession(userAgent: string | null) {
    try {
        const { account } = await createSessionClient(userAgent);
        account.deleteSession('current');
        cookies().delete(SESSION_KEY);
        return {
            success: true
        };
    } catch (error: any) {
        console.log('deleteSession error', error);
        return {
            error: error.message
        }
    }
}