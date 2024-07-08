'use client';

import { AuthError } from "next-auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {

    const [message, setMessage] = useState('');

    const searchParams = useSearchParams();

    const error = searchParams.get('error');

    useEffect(() => {
        switch(error as AuthError['type']) {
            case 'AccessDenied':
                setMessage('No tienes permisos para acceder al campus');
                break;
            default:
                setMessage('Ha ocurrido un error al intentar acceder al campus');
                break;
        }
    }, [error, message])

    return (
        <main className="min-h-screen flex justify-center items-center">
            <h1 className="px-4 text-2xl">🙁 {message}</h1>
        </main>
    )
}