
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="w-full lg:grid lg:min-h-[400px] lg:grid-cols-2">
                <div className="flex items-center justify-center pt-12">
                    {children}
                </div>
                <div className="max-h-screen hidden bg-muted lg:block">
                    <img
                        src="/grow-a-greener-future.jpg"
                        alt="Image"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </>
    );
}
