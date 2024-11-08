
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="w-full md:h-screen lg:grid lg:min-h-[400px] lg:grid-cols-2">
                <div className="flex items-center justify-center pt-12">
                    {children}
                </div>
                <div className="max-h-screen hidden bg-muted lg:block">
                    <img
                        src="https://res.cloudinary.com/dopcbgrcs/image/upload/f_auto/grow-a-greener-future_nkyqcw.jpg"
                        alt="Image"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
