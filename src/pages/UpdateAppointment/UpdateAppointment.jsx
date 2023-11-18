import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { getWorkers, portfolio, updateAppointment } from "../../services/apiCalls";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { selectAppointmentId } from "../appointmentSlice";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

export const UpdateAppointment = () => {

    const rdxToken = useSelector(selectToken);
    const rdxAppointmentId = useSelector(selectAppointmentId);
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        id: "",
        date: "",
        shift: "",
        email: "",
        portfolioId: ""
    });

    const [appointmentError, setAppointmentError] = useState({
        idError: "",
        dateError: "",
        shiftError: "",
        emailError: "",
        portfolioIdError: ""
    });

    useEffect(() => {
        if (rdxToken) {
            setAppointment((prevState) => ({ ...prevState, id: rdxAppointmentId }))
        } else {
            navigate("/");
        }
    }, [])

    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const [message, setMessage] = useState("");
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        if (workers.length === 0) {
            getWorkers()
                .then(
                    results => {
                        setWorkers(results.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log("artists value ", workers)
        }
    }, [workers]);

    const [gallery, setgallery] = useState("");

    useEffect(() => {

        if (gallery.length === 0) {
            portfolio()
                .then(
                    response => {
                        setgallery(response.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log(gallery)
        }
    }, [gallery]);

    const errorCheck = (e) => {

        let error = "";
        error = validator(e.target.name, e.target.value);

        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Update = () => {
        if (
            appointment.date !== "" &&
            appointment.shift !== "" &&
            appointment.email !== "" &&
            appointment.portfolioId !== "" &&
            appointment.id !== ""
        ) {
            const appointmentsWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 10),
                portfolioId: parseInt(appointment.portfolioId, 10),
            };
            updateAppointment(appointmentsWithNumber, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    const { message } = response.data;
                    setMessage(message);
                    if (message == "appointment updated succesfully") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 1000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setMessage("all fields are required")
        }
    };

    return (
        <div className="update-appointment-body">
            <div className="background"></div>
            <div className="pagination-update-appointment">
                <div>Update Appointment</div>
            </div>
            <div className="input-card-update-appointment">
            {
                    workers.length > 0 &&
                    <select name="email" onChange={functionHandler} className="select-custom">
                        <option>Select a worker</option>
                        {
                            workers.map(
                                worker => {
                                    return (
                                        <option key={worker.id}>{worker.email}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                {
                    gallery.length > 0 &&
                    <select name="portfolioId" onChange={functionHandler} className="select-custom">
                        <option value="">Select a service</option>
                        {gallery.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                }
                <CustomInput
                    design={"inputDesign"}
                    type={"date"}
                    name={"date"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.dateError}</div>
                <ShiftToggle
                    selectedShift={appointment.shift}
                    onShiftChange={(value) =>
                        setAppointment((prevState) => ({ ...prevState, shift: value }))
                    }
                />
                <div className='errorMsg'>{appointmentError.shiftError}</div>
                <LinkButtonCard
                    title={"Update"}
                    action={() => Update()}
                />
                <p className='errorMsg'>{message}</p>
            </div>
        </div>
    )
}