import UserAvatar from "./UserAvatar";

async function Header() {
    return (
        <div className='w-full p-2 fixed top-0 z-[999] pointer-events-none'>
            <UserAvatar />
        </div>
    )
}

export default Header;