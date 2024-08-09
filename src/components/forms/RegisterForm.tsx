"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as Z from 'zod';

const schema = Z.object({
    email: Z.string().email({ message: "Invalid email address" }),
    password: Z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: Z.string().min(6, { message: "Password must be at least 6 characters long" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

function RegisterForm() {
    const form = useForm<RegisterFormType>({ resolver: zodResolver(schema) });
    const { formState: { errors } } = form;
    const onSubmit = async (values: RegisterFormType) => {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        console.log('res', res);
    }

    return (
        <>
            <form 
                className="mx-auto grid w-[350px] gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to Sign up
                    </p>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@mail.com"
                            {...form.register("email")}
                        />
                        {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...form.register("password")} />
                        {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
                        {errors.confirmPassword && <p className='text-sm text-red-600'>{errors.confirmPassword.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign Up with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Login
                    </Link>
                </div>
            </form>
        </>
    )
}

export default RegisterForm;

type RegisterFormType = Z.infer<typeof schema>;