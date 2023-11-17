import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { allAppointments } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

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
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role == "super_admin") {
                const pageString = page.toString()
                allAppointments(rdxToken, pageString)
                    .then(
                        response => {
                            if (response.data.data.length != 0) {
                                setAppointments(response.data.data);
                            } else {
                                setPage(page - 1)
                            }
                        })
                    .catch(error => console.log(error));
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [page]);

    const rdxIdAppointment = (argumento) => {
        dispatch(appointmentId(argumento))
    }

    const changePageUpWorkers = () => {
        setPage(page + 1)
    }

    const changePageDownWorkers = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    return (
        <div className="get-appointments-body">

            <div className="get-all-appointments-body"></div>
            <div className="container-get-appointments">
                <div className="title-get-all-appointments">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownWorkers()}
                    />
                    <div>All Appointments</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpWorkers()}
                    />
                </div>
                <div className="get-all-appointments">
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
            </div>
        </div>
    )
}