import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { appointmentsUser, deleteAppointment } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { useNavigate } from "react-router-dom";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

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
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (rdxToken) {
            const pageString = page.toString()
            appointmentsUser(rdxToken, pageString)
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
    }, [page]);

    const rdxIdAppointment = (argumento) => {
        dispatch(appointmentId(argumento))
    }

    const deleteAppointments = (id, token) => {
        deleteAppointment(id, token)
            .then(response => {
                console.log(response.data.message);
                setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id));
            })
            .catch(error => console.log(error))
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
        <div className="appointments-body">
            <div className="all-appointments-body"></div>
            <div className="container-appointments">
                <div className="title-all-appointments">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownWorkers()}
                    />
                    <div>Your Appointments</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpWorkers()}
                    />
                </div>
                <div className="all-appointments">
                    {
                        appointments
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
                                                    emit={() => rdxIdAppointment(appointment.id)}
                                                    action={() => deleteAppointments(appointment.id, rdxToken)}
                                                />
                                            )
                                        }
                                        )}
                                </div>
                                <div className="margin-top">
                                    <LinkButtonCard
                                        path={"/createAppointment"}
                                        title={"Create"} />
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