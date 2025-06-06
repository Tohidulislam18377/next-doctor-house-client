import { useAuth } from '@/provider/AuthProvider';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react';

const axiosSecure = axios.create({
    // baseURL: 'https://doctor-house-server-zeta.vercel.app/api'
    baseURL: 'http://localhost:5000/api/'
})

export default function UseAxiosSecure() {
    const { logOut } = useAuth()
    const router = useRouter();

    // add a request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.Authorization = `Bearer ${token}` // স্পেস যোগ করা হয়েছে
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    const responseInterceptor = axiosSecure.interceptors.response.use((config) => {
        return config
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            await logOut()
            window.location.href = '/';
            // router.push('/')
        }
        return Promise.reject(error)
    })

    // cleanup interceptor on unmount
    // (optional but recommended)
    React.useEffect(() => {
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [])

    return axiosSecure;
}
