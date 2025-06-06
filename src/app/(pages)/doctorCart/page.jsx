
import Image from 'next/image'
import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FcViewDetails } from "react-icons/fc";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import Rating from 'react-rating';

export default function DoctorCart({ item }) {
    const { image, category, price, rating, location, available, name, _id } = item
    // console.log(item)
    // const post = getPosts();
    return (
        <div className='border border-2px border-[#E6E6E6] w-[364px] h-[569px] ml-3 md:ml-3 bg-[#FFF] shadow-md mb-5 transition duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2  focus:ring-opacity-50'>
            <Image className='h-[250px] w-[300px] mx-auto mt-4 rounded'
                alt='doctor image'
                src={image}
                height={250}
                width={300}
            />
            <p className='ml-8 font-bold text-2xl pt-2 pb-1'>{name}</p>
            <p className='ml-8 font-semibold text-2xl pb-1'>BTP-{category}</p>
            <Rating className='ml-8 mb-1'
                readonly
                initialValue={Math.min(parseFloat(rating), 5)}
                emptySymbol={<FaStar className="text-[#F2871D] text-xl" />}
                placeholderSymbol={<FaStar className="text-[#F2871D] text-xl" />}
                fullSymbol={<FaStar className="text-[#F2871D] text-xl" />}
                edit={false}
                SVGstyle={{ display: "inline-block" }}
            />

            <hr className='text-[#F3F3F3] w-[324px] mx-auto h-[1px] mb-1' />
            <div className='ml-8 mb-2'>
                <p className='flex items-center gap-2 text-2xl'><FaLocationDot /> {location}</p>
                <p className='flex items-center  gap-2 text-2xl'><AiFillDollarCircle /> {price}</p>
                <p className='flex items-center gap-2 text-2xl'><FcViewDetails />{available}</p>
            </div>
            <div className='w-[290px] p-2 ml-9 border border-2px border-[#F7A582] mx-auto text-center text-[#F7A582] hover:text-white hover:bg-[#F7A582] transition-all duration-300 ease-in-out rounded '>
                <Link href={`/doctorCart/${_id}`}>View Profile</Link>
            </div>
        </div >

    )
}
