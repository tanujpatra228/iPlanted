import { Suspense } from 'react';
import LoginForm from './_components/LoginForm';

function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

export default LoginPage;