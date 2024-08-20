import { SESSION_KEY } from "@/helpers";
import { cookies } from "next/headers";
import { Models } from "node-appwrite";

// Set session cookie
export function setSession(session: Models.Session) {
    cookies().set(SESSION_KEY, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: new Date(session.expire),
    });
}

// Delete session cookie
export function deleteSession() {
    cookies().delete(SESSION_KEY);
}