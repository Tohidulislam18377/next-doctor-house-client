"use client";
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/assets/images/Group 1.png'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/provider/AuthProvider';

export default function NavBar() {
    const { logOut, user } = useAuth();
    const pathname = usePathname();
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'AllDoctor', href: '/allDoctor/cardiology' },
        { name: 'Appointment', href: '/appointment' }
    ];
    const handelSingOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    };

    return (
        <div className='bg-[#07332F] text-white sticky z-30 top-0'>
            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className={`p-[5x] rounded hover:bg-[#F7A582] ${pathname === item.href ? 'bg-[#F7A582]' : ''}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link className='flex items-center gap-x-2 md:ml-4 ' title='Home' href={'/'}><Image
                        alt=''
                        src={logo}
                        width={50}
                        height={50}
                    ></Image><span className='text-[#F7A582] md:ml-5px'>Doc</span> House</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-x-5 px-1 text-white">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className={`p-[5px] rounded hover:bg-[#F7A582] ${pathname === item.href ? 'bg-[#F7A582]' : ''}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end md:mr-5">
                    {user ? <button onClick={handelSingOut} className='inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68]  transition-all duration-300 ease-in-out'>SingOut</button> : <Link href={'/login'} className='inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68]  transition-all duration-300 ease-in-out'>SingIn</Link>}
                </div>
            </div>
        </div >
    )
}


