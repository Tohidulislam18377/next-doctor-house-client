"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import { AuthProvider } from "@/provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";


export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    const pathName = usePathname();
    const hideFooterRoutesAndSingUp = ['/login', '/singup',];
    const noNavBarAndSingUp = hideFooterRoutesAndSingUp.includes(pathName)

    return (

        <AuthProvider>
            {noNavBarAndSingUp || <NavBar />}
            <ToastContainer />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            {noNavBarAndSingUp || <Footer />}
        </AuthProvider>
    )
}
