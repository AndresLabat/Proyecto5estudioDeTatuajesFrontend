import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { appointmentsUser } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Appointments = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (rdxToken && appointments.length == 0) {
            appointmentsUser(rdxToken)
                .then(response => {
                    setAppointments(response.data.data);
                })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, []);

    const localStorageId = (argumento) => {
        localStorage.setItem("appointmentId", argumento)
    }
    console.log(appointments);
    return (
        <div className="appointments-body">
            {
                appointments
                    ? (<div className='appointments-Roster'>
                        <div className="create-button">
                            <LinkButton
                                classButton={"createAppointment"}
                                path={"/createAppointment"}
                                title={"Create Appointment"} />
                        </div>
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
                                            emit={() => localStorageId(appointment.id)}
                                        />
                                    )
                                }
                                )}
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