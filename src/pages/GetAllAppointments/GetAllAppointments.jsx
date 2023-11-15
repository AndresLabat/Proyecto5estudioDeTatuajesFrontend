import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { allAppointmens } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Rdx escritura
import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { appointmentId } from "../appointmentSlice";

//Rdx lectura
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const GetAllAppointments = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [appointments, setAppointments] = useState([])
    const [flag, setflag] = useState(false)

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role == "super_admin") {
                allAppointmens(rdxToken)
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
        } else {
            navigate("/");
        }
    }, [appointments]);

    const rdxIdAppointment = (argumento) => {
        dispatch(appointmentId(argumento))
    }

    return (
        <div className="appointments-body">
            {
                appointments.length > 0
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
                                    if (appointment.status) {
                                        appointment.status = "pending"
                                    } else if (!appointment.status) {
                                        appointment.status = "done"
                                    }
                                    return (
                                        <CardAppointment
                                            appointmentId={appointment.id}
                                            nameProduct={appointment.name}
                                            imageProduct={appointment.image}
                                            categoryProduct={appointment.category}
                                            priceProduct={appointment.price}
                                            emailWorker={appointment.worker_email}
                                            nameWorker={appointment.worker_name}
                                            date={appointment.date}
                                            shift={appointment.shift}
                                            client_name={appointment.client_name}
                                            client_email={appointment.client_email}
                                            status={appointment.status}
                                            emit={() => rdxIdAppointment(appointment.id)}
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