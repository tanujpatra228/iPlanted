import { Suspense } from 'react';
import RegisterForm from './_components/RegisterForm';

function RegisterPage() {
    return (
        <Suspense>
            <RegisterForm />
        </Suspense>
    )
}

export default RegisterPage;