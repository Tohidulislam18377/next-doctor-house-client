"use client";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/AuthProvider';
import UseAxiosSecure from './useAxiosSecure';

export default function UseAppointment() {
    const axiosSecure = UseAxiosSecure();
    const { user } = useAuth();
    const { data: appointments = [], refetch } = useQuery({
        queryKey: ['appointments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appointments?email=${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })
    return [appointments, refetch]
}
