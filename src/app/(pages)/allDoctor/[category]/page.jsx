"use client"
import UseMenu from '@/hooks/useMenu';
import { useParams } from 'next/navigation'
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTap from '../../orderTap/page';
import Link from 'next/link';

export default function AllDoctor() {
    const categories = ['cardiology', 'pediatric dentistry', 'general medicine', 'dermatology', 'aesthetic medicine']
    // console.log(categories)
    const { category } = useParams();
    // const category = params.category;
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menus] = UseMenu();

    const cardiology = menus.filter(menu => menu.category === 'cardiology');
    const pediatricDentistry = menus.filter(menu => menu.category === 'pediatric dentistry');
    const generalMedicine = menus.filter(menu => menu.category === 'general medicine');
    const dermatology = menus.filter(menu => menu.category === 'dermatology');
    const aestheticMedicine = menus.filter(menu => menu.category === 'aesthetic medicine')
    // console.log(pediatricDentistry, cardiology, generalMedicine, dermatology, aestheticMedicine)

    return (
        <div>
            <div className="bg-[#07332F] h-[300px] text-white mb-5">
                <div className="flex gap-2 pt-[120px] justify-center md:justify-start md:ml-4">
                    <Link className="" href={'/'}><span className="font-semibold">Home</span> /</Link>
                    <p className="font-semibold ">Doctor Profile</p>
                </div>
                <p className="font-bold text-4xl text-center md:text-left md:ml-4">Doctor Profile</p>
            </div>
            <Tabs className={'mb-5'} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <div className='flex flex-col md:flex-row justify-center items-center '>
                        <Tab>Cardiology</Tab>
                        <Tab>Pediatric Dentistry</Tab>
                        <Tab>General Medicine</Tab>
                        <Tab>Dermatology</Tab>
                        <Tab>Aesthetic Medicine</Tab>
                    </div>
                </TabList>
                <TabPanel>
                    <OrderTap items={cardiology}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={pediatricDentistry}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={generalMedicine}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={dermatology}></OrderTap>
                </TabPanel>
                <TabPanel>
                    <OrderTap items={aestheticMedicine}></OrderTap>
                </TabPanel>
            </Tabs>
        </div>
    )
}
