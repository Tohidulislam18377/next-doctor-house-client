"use client";

import UseAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/provider/AuthProvider";
import PrivateRoute from "@/router/PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import { setHours, setMinutes } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineDollar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Rating } from "react-simple-star-rating";
import calendarImage from '../../../../../public/assets/images/viewDetails.jpg';
import Swal from "sweetalert2";

export default function ViewProfile() {
    const router = useRouter()
    const { user } = useAuth();
    const { _id } = useParams();
    const axiosSecure = UseAxiosSecure();
    // calendar section
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16) // 4:30 PM
    );
    // serial section
    const [bookedSerials, setBookedSerials] = useState([]);
    const [selectedSerial, setSelectedSerial] = useState(null);
    const totalSerial = 30;
    let serial = [];
    // console.log(serial)
    for (let i = 1; i <= totalSerial; i++) {
        serial.push(i)
    }

    useEffect(() => {
        const fetchBookedSerials = async () => {
            if (!startDate) return;
            try {
                const res = await axiosSecure.get(`/appointments?date=${startDate.toISOString().split('T')[0]}`);
                const booked = res.data.map(item => item.serial);
                setBookedSerials(booked);
            } catch (err) {
                console.error('Failed to fetch booked serials:', err);
            }
        };

        fetchBookedSerials();
    }, [startDate]);


    // menu data collection
    const { data: ViewProfile = [] } = useQuery({
        queryKey: ['menus', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menus/${_id}`)
            // console.log(res.data)
            return res.data
        }
    })
    // console.log(_id);
    const { image, location, price, available, award1, award2, category, details, education, rating, services, specializations, workExperience, name } = ViewProfile
    // console.log(ViewProfile)

    const handelAddAppointment = async (view) => {
        if (!selectedSerial) {
            return Swal.fire("Please select a serial!");
        }

        const appointmentInfo = {
            name,
            specializations,
            location,
            price,
            services,
            category,
            image,
            date: startDate.toISOString().split('T')[0],
            serial: selectedSerial,
            email: user?.email
        };
        const appointmentRes = await axiosSecure.post('/appointments', appointmentInfo);
        if (appointmentRes.data.insertedId) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your appointment has been booked!",
                showConfirmButton: false,
                timer: 1000
            });
            setBookedSerials((prev) => [...prev, selectedSerial]);
            setSelectedSerial(null);
        }
        router.push('/appointment');
    }

    return (
        <PrivateRoute>

            <div className="mb-5">
                <div className="bg-[#07332F] h-[200px] text-white mb-5">
                    <div className="flex gap-2 pt-[50px] justify-center md:justify-start md:ml-4">
                        <Link className="" href={'/'}><span className="font-semibold">Home</span> /</Link>
                        <p className="font-semibold ">Doctor Profile</p>
                    </div>
                    <p className="font-bold text-4xl text-center md:text-left md:ml-4">Doctor Profile</p>
                </div>
                {/* calendar section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <div>
                        {/* Date format */}
                        <div className="max-w-md mx-auto  rounded-xl shadow-lg bg-white ">
                            {/* Selected Date Display */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-1 ">Your Selected Date & Time:</p>
                                {/* calendar input section */}
                                <div>
                                    <input
                                        type="text"
                                        value={startDate.toLocaleString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                        readOnly
                                        className="border p-2 w-[325px] rounded mb-2"
                                    />
                                </div>
                            </div>

                            {/* Inline Date Picker */}
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                inline
                                excludeTimes={[
                                    setHours(setMinutes(new Date(), 0), 17),
                                    setHours(setMinutes(new Date(), 30), 18),
                                    setHours(setMinutes(new Date(), 30), 19),
                                    setHours(setMinutes(new Date(), 30), 17),
                                ]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>
                    </div>
                    {/* calendar image section */}
                    <div>
                        <Image className="md:w-[594px] md:h-[355px] rounded"
                            alt="calendar Image"
                            src={calendarImage}
                            height={400}
                            width={400}
                        />
                    </div>
                </div>
                {/* serial number section */}
                <div className="p-6 max-w-lg mx-auto">
                    <h2 className="text-xl font-bold mb-4">Appointment Serials</h2>

                    <div className="grid grid-cols-6 md:grid-cols-10 gap-2 mb-4">
                        {serial.map((num) => (
                            <button
                                key={num}
                                disabled={bookedSerials.includes(num)}
                                onClick={() => setSelectedSerial(num)}
                                className={`py-2 rounded 
                ${bookedSerials.includes(num)
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : selectedSerial === num
                                            ? "bg-blue-500 text-white"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

                    {/* <button
                        onClick={() => handelAddAppointment(ViewProfile)}
                        disabled={!selectedSerial}
                        className="inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] transition-all duration-300 ease-in-out mb-2 mt-2 ml-[100px] md:ml-0 disabled:bg-gray-400"
                    >
                        Add Appointment
                    </button> */}
                </div>
                {/* Profile Details */}
                <div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-x-10 bg-[#F3F3F3] mb-5">
                        <div>
                            {image?.length > 0 && (<Image className="w-[420px] md:w-[300px] h-[300px]"
                                src={image}
                                alt="View Details Image"
                                height={300}
                                width={300}
                            />)}
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">{name}</p>
                            <p className="text-xl font-semibold mb-2">MBBS, {typeof category === "string"
                                ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
                                : "Unknown"}</p>
                            <Rating className=' mb-1'
                                readonly
                                initialValue={Math.min(parseFloat(rating), 5)}
                                emptySymbol={<FaStar className="text-[#F2871D] text-xl" />}
                                placeholderSymbol={<FaStar className="text-[#F2871D] text-xl" />}
                                fullSymbol={<FaStar className="text-[#F2871D] text-xl" />}
                                edit={false}
                                SVGstyle={{ display: "inline-block" }}
                            />
                            <p className="flex items-center gap-x-2 mb-2"><span><FaLocationDot className="text-2xl" /></span>{location}</p>
                            <p className="flex items-center gap-x-2"><AiOutlineDollar className="text-2xl" />{price}</p>
                        </div>
                    </div>
                    {/**all portfolio details**/}
                    <div>
                        <p className="text-4xl font-bold mb-2 text-center">About Me</p>
                        <p className="font-medium text-center mb-2">{details}</p>
                        <div className="flex flex-col md:flex-row gap-x-10 justify-center items-center border border-2px border-[#E6E6E6] pl-0 md:pl-8 md:w-[800px] mx-auto">
                            <div className="w-[400px] md:w-[420px] pl-4 pr-4">
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Education</p>
                                <p className="w-full md:w-[200px] font-medium text-center md:text-start">{education}</p>
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Work & Experience</p>
                                <p className="w-full md:w-[200px] text-center md:text-start font-medium">{workExperience}</p>
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Services</p>
                                <p className="w-full md:w-[200px] font-medium text-center md:text-start">{services}</p>
                            </div>
                            <div className="w-[400px] md:w-[420px] pl-4 pr-4">
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Award</p>
                                <p className="w-full md:w-[200px] text-center md:text-start font-medium">{award1}</p>
                                <p className="w-full md:w-[200px] text-center md:text-start font-medium">{award2}</p>
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Available</p>
                                <p className="w-full md:w-[200px] font-medium text-center md:text-start">{available}</p>
                                <p className="text-4xl font-bold block mb-2 text-center md:text-start">Specializations</p>
                                <p className="w-full md:w-[200px] text-center md:text-start font-medium">{specializations}</p>
                                <button onClick={() => handelAddAppointment(ViewProfile)} className="inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] mb-2 mt-2 ml-[100px] md:ml-0 transition duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2  focus:ring-opacity-50">Add Appointment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </PrivateRoute >
    )
}
