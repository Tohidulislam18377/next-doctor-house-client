"use client"
import UseAxiosPublic from '@/hooks/useAxiosPublic';
import { useAuth } from '@/provider/AuthProvider'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export default function Google() {
    const { singUpGoogle } = useAuth();
    const useAxiosPublic = UseAxiosPublic();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handelGoogle = () => {
        singUpGoogle()
            .then(async (result) => {
                const loggedUser = result.user;
                const saveUser = { name: loggedUser.displayName, email: loggedUser?.email }
                if (!saveUser.email) {
                    alert("Email not found from Google account!");
                    return;
                }
                try {
                    await useAxiosPublic.post('/users', saveUser)
                    const redirectPath = searchParams.get('redirect');
                    router.push(redirectPath || '/')
                } catch (error) {
                    if (error.response?.data?.message === 'user already exists') {
                        const redirectPath = searchParams.get('redirect');
                        router.push(redirectPath || '/')
                    } else {
                        console.error("Failed to save user or redirect:", error.response?.data || error.message);
                    }
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <div className='flex justify-center p-2'>
            <button onClick={handelGoogle} className=" border border-black p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g>
                        <path d="M0 12C0 5.3832 5.3832 0 12 0C14.6723 0 17.2017 0.859771 19.3147 2.4864L16.5262 6.1088C15.2197 5.10309 13.6545 4.57143 12 4.57143C7.90389 4.57143 4.57143 7.90389 4.57143 12C4.57143 16.0961 7.90389 19.4286 12 19.4286C15.2991 19.4286 18.1026 17.2671 19.0688 14.2857H12V9.71429H24V12C24 18.6168 18.6168 24 12 24C5.3832 24 0 18.6168 0 12Z" fill="#444444" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3_103">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    )
}
