import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import DoctorCart from '../doctorCart/page';
import './order.css'

export default function OrderTap({ items }) {
    // console.log(items)
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <div className='order-tab'>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-5 ml-2 lg:ml-4 mt-10">
                        {
                            items.map(item =>
                                <DoctorCart
                                    key={item._id}
                                    item={item}
                                ></DoctorCart>)
                        }
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
