"use client";
import { useQuery } from '@tanstack/react-query'
import UseAxiosPublic from './useAxiosPublic'

export default function UseMenu() {
    const axiosPublic = UseAxiosPublic();
    const { data: menus = [], refetch } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menus');
            // console.log(res.data)
            return res.data;
        }
    })
    return [menus, refetch]
}
