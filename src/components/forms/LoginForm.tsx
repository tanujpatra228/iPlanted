"use client"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as Z from 'zod';

const schema = Z.object({
    email: Z.string().email({ message: "Invalid email address" }),
    password: Z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

function LoginForm() {
    const form = useForm<LoginFormType>({ resolver: zodResolver(schema) });
    const { formState: { errors } } = form;
    const onSubmit = async (values: LoginFormType) => {
        // Login Logic
        console.log('values', values);
    }

    return (
        <>
            <form
                className="mx-auto grid w-[350px] gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...form.register("email")}
                        />
                        {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" {...form.register("password")} />
                        {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </form>
        </>
    )
}

export default LoginForm;

type LoginFormType = Z.infer<typeof schema>;