import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { appointmentsUser } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";

export const Appointments = () => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && appointments.length === 0) {
            appointmentsUser(token)
                .then(response => {
                    setAppointments(response.data.data);
                })
                .catch(error => console.log(error));
        }
    }, [appointments]);

    return (
        <div className="appointments-body">
            {
                appointments.length > 0
                    ? (<div className='appointments-Roster'>
                        <div>
                            {
                                appointments.map(appointment => {
                                    return (
                                        <CardAppointment
                                            appointmentId={appointment.id}
                                            nameProduct={appointment.name}
                                            imageProduct={appointment.image}
                                            categoryProduct={appointment.category}
                                            priceProduct={appointment.price}
                                            emailWorker={appointment.email}
                                            nameWorker={appointment.full_name}
                                            date={appointment.date}
                                            shift={appointment.shift}
                                        />
                                    )
                                }
                                )}
                            <div>
                                <LinkButton
                                    classButton={"createAppointment"}
                                    path={"/createAppointment"}
                                    title={"Create Appointment"} />
                            </div>
                        </div>
                    </div>
                    )
                    : (
                        <div>Loading...</div>
                    )
            }
        </div>
    )
}