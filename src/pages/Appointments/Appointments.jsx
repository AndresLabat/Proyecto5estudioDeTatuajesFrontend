import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { appointmentsUser, deleteAppointment } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx escritura
import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { appointmentId } from "../appointmentSlice";

//Rdx lectura
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Appointments = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [appointments, setAppointments] = useState([])
    const [flag, setflag] = useState(false)

    useEffect(() => {
        if (rdxToken) {
            appointmentsUser(rdxToken)
                .then(
                    response => {
                        if (flag == false) {
                            setAppointments(response.data.data);
                            setflag(true)
                        }
                    })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, [appointments]);

    const rdxIdAppointment = (argumento) => {
        dispatch(appointmentId(argumento))
    }

    const deleteAppointments = (body, token) => {
        deleteAppointment(body, token)
        .then(response =>{
            console.log(response.data.message);
        } )
        .catch(error => console.log(error))
    }

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
                                            emit={() => rdxIdAppointment(appointment.id)}
                                            action={() => deleteAppointments(appointment.id, rdxToken)}
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