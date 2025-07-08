"use client";
import Link from "next/link";
import banner from '../../public/assets/images/banner.png';
import serviceBanner from '../../public/assets/images/Rectangle 20078.jpg';
import serviceBanner2 from '../../public/assets/images/treeth.jpeg'
import { WiTime8 } from "react-icons/wi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneCallback, MdSettingsPhone } from "react-icons/md";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from '../hooks/useAxiosPublic'
import { FaQuoteLeft } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";


export default function Home() {
  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //   }
  // };
  const axiosPublic = UseAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews')
      console.log(res.data)
      return res.data;
    }
  })


  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-x-5 bg-[#07332F] md:h-[400px] mb-5 ">
        <div className="text-[#F3F3F3] ">
          <p className="text-center text-5xl font-bold mb-2">Your Best Medical <br /> Help Center</p>
          <p className="text-center ml-6 mr-5 mb-2">Lorem Ipsum is simply dummy text they are printing typesetting <br /> has been the industry stardard.</p>
          <div className="w-[200px] text-center mx-auto pt-3 pb-5">
            <Link className="inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] transition-all duration-300 ease-in-out" href={'/allDoctor'}>All Doctor</Link>
          </div>
        </div>
        <div className="w-auto mx-auto ">
          <Image className="pb-5"
            alt=""
            src={banner}
          ></Image>
        </div>
      </div>
      {/* our service */}
      <div className="flex flex-col gap-5 md:gap-10 md:flex-row mb-8 ml-5 mr-5 md:ml-0 md:mr-0 justify-center">
        <div className="md:w-[550px]">
          <Image className="h-[830px]"
            alt=""
            src={serviceBanner}
          ></Image>
        </div>
        <div className="w-[390px] md:w-[578px]">
          <p className="text-center md:text-start text-4xl font-bold mb-2">Our Services</p>
          <p className="mb-3">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <div>
            <div className="mb-2 border border-1px border-[#E6E6E6] flex flex-col md:w-[76%] md:mx-auto md:flex-row gap-2 text-center mr-5">
              <Link className="pl-4 inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 hover:bg-[#e78a68]  transition-all duration-300 ease-in-out" href={'/allDoctor/cardiology'}>Cardiology</Link>
              <Link className="pl-4 inline-block bg-[#F7A582] text-white font-semibold py-2 px-5  hover:bg-[#e78a68]  transition-all duration-300 ease-in-out" href={'/allDoctor/dermatology'}>Dermatology</Link>
              {/* <Link className=" pl-4 inline-block bg-[#F7A582] text-white font-semibold py-2 px-6  hover:bg-[#e78a68]  transition-all duration-300 ease-in-out" href={'/allDoctor/pediatricdentistry'}>Oral Surgery</Link> */}
              <Link className="pl-4 inline-block bg-[#F7A582] text-white font-semibold py-2 px-6  hover:bg-[#e78a68]  transition-all duration-300 ease-in-out" href={`/allDoctor/${encodeURIComponent('pediatric dentistry')}`}>Pediatric Dentistry</Link>

            </div>
            <Image className="w-[370px] md:w-[600px] mb-2 rounded"
              alt=""
              src={serviceBanner2}
              height={350}></Image>
            <p className="text-3xl font-bold">Electro  Gastrology Therapy</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error </p>
            <p className="pb-2">Sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <div className="text-center md:text-start">
              <Link className="inline-block bg-[#F7A582] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#e78a68] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out" href={'/allDoctor'}>More Details</Link>
            </div>
          </div>
        </div>
      </div>
      {/* opening contact location */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-white mb-5">
        <div className="w-[380px] flex gap-4 py-5 px-5 rounded bg-[#07332F]">
          <p><WiTime8 className="h-12 w-12 " /></p>
          <div>
            <p>Opening Hours</p>
            <p>Open 9.00 am to 5.00pm <br /> Everyday</p>
          </div>
        </div>
        <div className="w-[380px] flex gap-4 py-5 px-5 rounded bg-[#F7A582]">
          <p><IoLocationOutline className="h-12 w-12 " /></p>
          <div>
            <p>Our Locations</p>
            <p>Dhanmondi 17, Dhaka <br /> -1200, Bangladesh</p>
          </div>
        </div>
        <div className="w-[380px] flex rounded gap-4 py-5 px-5 bg-[#07332F]">
          <p><MdOutlinePhoneCallback className="h-12 w-12 " /></p>
          <div>
            <p> Contact Us</p>
            <p> +88 01750 00 00 00 <br />+88 01750 00 00 00</p>
          </div>
        </div>
      </div>
      {/* What Our Patients Says */}
      <div>
        <p className="text-center font-bold text-4xl">What Our Patients Says</p>
        <p className="text-center font-semibold mb-5">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa <br /> quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <div className="md:ml-5 md:mr-5">
          <Swiper navigation={true} modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 }
            }}
            spaceBetween={40}
            className="mySwiper">
            {
              reviews.map(review =>
                <SwiperSlide key={review._id}>
                  <div className='mb-8 bg-white border-solid border-2 border-[#E6E6E6] h-[245px] pl-10 pr-10 pt-5 shadow-md'>
                    <div className='flex'>
                      <div className='flex items-center gap-2 '>
                        <div className="avatar">
                          <div className="w-24 rounded-full">
                            <img src={review.image} />
                          </div>
                        </div>
                        <div>
                          <p>{review.name}</p>
                          <p>{review.category}</p>
                        </div>
                        <FaQuoteLeft className='md:ml-20 text-4xl text-[#F7A582]' />
                      </div>
                    </div>
                    <p className='w-72 mx-auto pt-1'>{review.description}</p>
                  </div>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      </div>
      {/* contact section */}
      <div className="flex flex-col gap-5 md:flex-row items-center pt-4 md:pt-0 h-[670px] md:h-[400px] bg-[#07332F] md:ml-4 md:mr-4 mb-4">
        {/* contact section part */}
        <div className="w-full md:w-[550px] pl-8 text-white">
          <p className="font-bold text-4xl mb-2">Contact With Us</p>
          <p className="font-semibold leading-7 mb-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi.</p>
          <p className="flex items-center gap-2"><span><MdSettingsPhone className="text-3xl mb-2" /></span> +88 01750 14 14 14</p>
          <p className="flex items-center gap-2"><span><CiLocationOn className="text-3xl mb-2" /></span> Dhanmondi, Dhaka, Bangladesh</p>
        </div>
        {/* from section */}
        <div>
          <form>
            <div className="flex flex-col md:flex-row gap-5 mb-4 ">
              <input className="block text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2 w-[267px]" type="text" name="text" id="" placeholder="Name" required />
              <input className="text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2  w-[267px]" type="email" name="email" id="" placeholder="Email" required />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input className="block text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2  w-[267px]" type="tel" name="number" id="" placeholder="Number" />
              <input className="text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2  w-[267px]" type="text" name="doctorName" id="" placeholder="Doctor Name" required />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input className="block text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2 w-[267px]" type="date" name="date" id="" placeholder="Date" required />
              <input className="text-white outline-none bg-[rgba(255,255,255,0.05)] pl-4 p-2  w-[267px]" type="time" name="time" id="" placeholder="Time" required />
            </div>
            <div className=" mx-auto  text-center">
              <input className=" p-2 inline-block bg-[#F7A582] text-white font-semibold  px-5 rounded-full hover:bg-[#e78a68]  transition-all duration-300 ease-in-out w-[267px] md:w-[550px]" type="submit" value="Book Now" />
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}
