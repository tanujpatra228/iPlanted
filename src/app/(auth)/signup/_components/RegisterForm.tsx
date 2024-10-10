"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RegisterFormType, signUpSchema } from '@/schema/signUpSchema';
import { signUpWithGoogle } from '@/server/oauth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ToastAction } from '../../../../components/ui/toast';
import { PasswordInput } from '@/app/(auth)/_components/PasswordInput';
import { Loader2 } from 'lucide-react';

function RegisterForm() {
    const params = useSearchParams();
    const router = useRouter();
    const [signUpState, setSignUpState] = useState({isLoading: false, isSuccess: false, isError: false});
    const [oAuth2State, setOAuth2State] = useState({isLoading: false, isSuccess: false, isError: false});
    const { toast } = useToast();
    const form = useForm<RegisterFormType>({ resolver: zodResolver(signUpSchema) });
    const { formState: { errors } } = form;
    
    const onSubmit = async (values: RegisterFormType) => {
        setSignUpState({isLoading: true, isSuccess: false, isError: false});
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        
        switch (response.status) {
            case 201: {
                setSignUpState({isLoading: false, isSuccess: true, isError: false});
                toast({
                    title: "Welcome aboard!",
                    description: "🌸 Let's plant your first green companion.",
                });
                router.replace('/map');
                break;
            }

            case 409: {
                setSignUpState({isLoading: false, isSuccess: false, isError: true});
                toast({
                    variant: "default",
                    title: "Email is already registered",
                    description: "🍂 Please check your info or try to login.",
                });
                break;
            }

            default: {
                setSignUpState({isLoading: false, isSuccess: false, isError: true});
                toast({
                    variant: "destructive",
                    title: "Something's off!",
                    description: "🍂 Please check your info and sign up again.",
                });
                break;
            }
        }
    }

    const handleGoogleLogin = async (event: MouseEvent) => {
        try {
            event.preventDefault();
            setOAuth2State({isLoading: true, isSuccess: false, isError: false});
            await signUpWithGoogle();
        } catch (error) {
            setOAuth2State({isLoading: false, isSuccess: false, isError: true});
            console.log('handleGoogleLogin error', error);
        }
    }

    const handleGoogleOauthError = () => {
        try {
            const error = params.get('error');
            if (!error) return;
            
            setOAuth2State({isLoading: false, isSuccess: false, isError: true});
            toast({
                variant: "destructive",
                title: "Uh oh! Google Sign-up failed",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again" onClick={handleGoogleLogin}>Try again</ToastAction>,
            });
        } catch (error) {
            console.log('handleGoogleOauthError error', error);
        }
    }

    useEffect(() => {
        // Wrapped the error function into setTimeout to solve shadcn toast not working issue
        const timeout = setTimeout(handleGoogleOauthError, 0);
        return (() => clearTimeout(timeout))
    }, []);

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
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="name"
                            placeholder="Name"
                            {...form.register("name")}
                        />
                        {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="mail@domain.com"
                            {...form.register("email")}
                        />
                        {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput id="password" type="password" placeholder="******" {...form.register("password")} />
                        {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <PasswordInput id="confirmPassword" type="password" placeholder="******" {...form.register("confirmPassword")} />
                        {errors.confirmPassword && <p className='text-sm text-red-600'>{errors.confirmPassword.message}</p>}
                    </div>
                    <Button type="submit" disabled={signUpState.isLoading || oAuth2State.isLoading} className="w-full">
                        {signUpState.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sign Up
                    </Button>
                    <Button variant="outline" disabled={oAuth2State.isLoading || signUpState.isLoading} className="w-full" onClick={handleGoogleLogin}>
                        {oAuth2State.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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
