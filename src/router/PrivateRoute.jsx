"use client"
import { useAuth } from '@/provider/AuthProvider'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?redirect=${pathname}`);
        }

    }, [user, loading, pathname, router])

    if (loading || !user) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
    }
    return children
}

