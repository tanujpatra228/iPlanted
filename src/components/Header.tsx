import { getCurrentUser } from "@/appwrite/appwrite";
import UserAvatar from "./UserAvatar";

async function Header() {
    const sessionUser = await getCurrentUser();
    
    return (
        <div className='w-full p-2 fixed top-0 z-[999] pointer-events-none'>
            <UserAvatar sessionUser={sessionUser} />
        </div>
    )
}

export default Header;