"use client"

import UseAppointment from "@/hooks/useAppointment";
import UseAxiosSecure from "@/hooks/useAxiosSecure";
import Image from "next/image"
import Link from "next/link";
import Swal from "sweetalert2";

export default function AppointmentDetails({ appointment }) {
    const { category, image, date, serial, location, name, price, services, specializations, _id } = appointment
    const axiosSecure = UseAxiosSecure();
    const [, refetch] = UseAppointment();
    const handelAppointmentDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/appointments/${id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Appointment has been deleted.",
                        icon: "success",
                        timer: 1000
                    });
                }
            }
        });
    };

    console.log(appointment)
    return (
        < div >
            {/* appointment details */}
            <div className="flex flex-col gap-x-5 items-center md:items-start md:flex-row lg:flex-row border border-2px rounded-2xl border-[#E6E6E6]  h-auto md:h-auto">
                {/* card name section */}
                <div style={{ borderRadius: '16px 0px 0px 16px' }} className="bg-[#07332F] w-full md:w-[420px] h-auto pt-6 ">
                    <Image className="rounded-full object-cover border-4 border-1px border-[#CECECE] mb-4 shadow-lg w-[150px] h-[150px] mx-auto"
                        alt="image appointment details image"
                        src={image}
                        width={150}
                        height={150}
                    ></Image>
                    <div className="pl-5">
                        <h1 className="text-3xl font-bold text-white">{name}</h1>
                        <p className="text-lg font-medium text-white">{specializations}</p>
                        <p className="text-lg text-white mt-2">{category}</p>
                        <p className="text-lg text-white mt-2 mb-2">{location}</p>
                        <p className=" font-semibold bg-[#07332F] text-white px-4 py-1 rounded-full border border-[#CECECE] text-center mr-5 mb-5">Serial: {serial}</p>
                    </div>
                </div>
                {/* card details section */}
                <div className="pr-5 pl-5 mt-5">
                    <p className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">Our Service</p>
                    <p className="text-3xl font-semibold mb-2">{services}</p>
                    <div className="bg-purple-50 p-5 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-black">Doctor Fee:</p>
                            <p className="text-2xl font-bold text-blackmt-1">$ {price}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-black">Date:</p>
                            <p className="text-2xl font-bold text-black mt-1">{date}</p>
                        </div>
                    </div>
                    <div className="mb-8 mt-5">
                        <Link href={'/payment'}>
                            <button className="block w-[300px] ml-8 md:ml-3 bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out mb-5">Book an Appointment</button>
                        </Link>
                        <button onClick={() => handelAppointmentDelete(_id)} className="block w-[300px] ml-8 md:ml-3  bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out ">Delete Appointment</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
