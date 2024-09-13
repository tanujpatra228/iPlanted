import { AuthContextType, AuthProvider } from "@/context/AuthContext";
import { getCurrentUser } from "@/appwrite/appwrite";

async function getAuthUser(): Promise<AuthContextType> {
    try {
        const user = await getCurrentUser();
        const isAuth = Boolean(user);
        return { user, isAuth };
    } catch (error) {
        return { user: null, isAuth: false };
    }
}

async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const authUser = await getAuthUser();
    return (
        <>
            <AuthProvider initialState={authUser}>
                {children}
            </AuthProvider>
        </>
    )
}

export default ProtectedLayout;