"use client";
import Image from 'next/image';
import logoBanner from '../../../../public/assets/images/banner-medicine.jpg'
import Link from 'next/link';
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { IoMdEyeOff } from 'react-icons/io';
import Google from '@/app/components/google';
import { useAuth } from '@/provider/AuthProvider';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function singUp() {
    const { createUser } = useAuth();
    const [show, setShow] = useState(false);
    const router = useRouter();

    const handelSingUp = (event) => {
        event.preventDefault();
        const target = event.target;
        const name = target.name.value;
        const email = target.email.value;
        const password = target.password.value;
        console.log(name, email, password);
        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                updateName(loggedUser, name)
                router.push('/');
                target.reset();
                console.log(loggedUser)
            })
            .catch((error) => {
                console.log(error)
                if (error.message) {
                    toast.success("You Have Already SingUp.Please Login", {
                        position: 'top-center'
                    })
                }
            })
    };
    const updateName = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
    };

    return (
        <div className='flex flex-col md:flex-row items-center justify-center  gap-5 md:gap-10 mt-5'>
            <div className=''>
                <Image className='w-[420px] md:w-[520px] h-[600px] ' alt=''
                    src={logoBanner}
                />
            </div>
            <div className='w-[400px] md:pr-5 border border-1px border-[#E6E6E6] p-2 '>
                <div className='w-[320px] mb-5 mx-auto text-[#0A0808] font-bold text-3xl'>
                    <p>Sign Up to Doc House</p>
                </div>
                <form onSubmit={handelSingUp}>
                    <div className='pl-8'>
                        <label className='mb-2 block font-semibold text-2xl'>Name</label>
                        <input className='outline-none h-[40px] bg-[#F3F3F3] pl-4 w-80 border-0 mb-2' type="text" name="name" id="" placeholder='Enter Your Name' required />
                    </div>
                    <div className='pl-8'>
                        <label className='mb-2 block font-semibold text-2xl'>Email</label>
                        <input className='outline-none h-[40px] bg-[#F3F3F3] pl-4 w-80 border-0 mb-2' type="email" name="email" id="" placeholder='Enter Your Email' required />
                    </div>
                    <div className='pl-8'>
                        <label className='block mb-2 font-semibold text-2xl'>Password</label>
                        <div className='flex items-center mb-5'>
                            <input className='outline-none h-[40px] bg-[#F3F3F3] pl-4 w-[280px] border-0' type={show ? "password" : "text"} name="password" id="" placeholder='Enter Your Password' required />
                            <p onClick={() => setShow(!show)} className=' h-[40px] p-2 bg-[#F3F3F3] '>{show ? <FaEye className='text-2xl' /> : <IoMdEyeOff className='text-2xl ' />}</p>
                        </div>
                    </div>
                    {/* <div className='pl-8 mb-2'>
                        <button>Forget Password</button>
                    </div> */}
                    <div className='text-center mb-2'>
                        <input className='inline-block bg-[#F7A582] text-[#3d3b3a] font-semibold py-2 px-5 rounded hover:bg-[#e78a68]  transition-all duration-300 ease-in-out w-[320px] ml-4' type="submit" value="singUp" required />
                    </div>
                </form>
                <Google />
                <p className='ml-11'>Already registered? . <Link className='text-[#F7A582]' href={'/login'}>Go to SIGN IN</Link> </p>
            </div>
        </div>
    )
}
