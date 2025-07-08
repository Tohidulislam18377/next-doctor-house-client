"use client";
import axios from 'axios'

export default function UseAxiosPublic() {
    const useAxiosPublic = axios.create({
        // baseURL: 'https://doctor-house-server-zeta.vercel.app/api'
        baseURL: 'http://localhost:5000/api/'
    })
    return useAxiosPublic;
}

