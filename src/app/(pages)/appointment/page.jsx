"use client";
import UseAppointment from '@/hooks/useAppointment';
import PrivateRoute from '@/router/PrivateRoute'
import React from 'react'
import AppointmentDetails from '../appointmentDetails/page';

export default function Appointment() {
    const [appointments] = UseAppointment();
    console.log(appointments)
    return (
        <PrivateRoute>
            <div className='mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 mb-8  gap-y-8 gap-x-5 ml-auto mr-auto md:ml-5 md:mr-5'>
                    {
                        appointments?.map(appointment => <AppointmentDetails
                            key={appointment._id}
                            appointment={appointment}
                        ></AppointmentDetails>)
                    }
                </div>
            </div>
        </PrivateRoute >
    )
}
