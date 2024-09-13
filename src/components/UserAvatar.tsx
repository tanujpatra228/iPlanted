"use client"
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserAvatar({ }: UserAvatarProps) {
    const {user: sessionUser} = useAuth();
    const router = useRouter();
    async function logOut() {
        const res = await fetch(`/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const { deleted } = await res.json();
        if (deleted) router.refresh();
    }
    
    function userInitials(str: string) {
        return str.split(" ").splice(0, 2).map(word => word.charAt(0)).join('');
    }

    if (!sessionUser) {
        return (
            <Link href='/login'>
                <Avatar className="pointer-events-auto float-right shadow-lg">
                    <AvatarImage src="" />
                    <AvatarFallback title="User">U</AvatarFallback>
                </Avatar>
            </Link>
        );
    }

    return (
        <Avatar className="pointer-events-auto cursor-pointer float-right shadow-lg" onClick={logOut}>
            <AvatarImage src="" />
            <AvatarFallback className="uppercase" title={sessionUser.name || sessionUser.email}>{userInitials(sessionUser.name || sessionUser.email)}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar;

type UserAvatarProps = {}