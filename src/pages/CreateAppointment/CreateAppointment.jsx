import React, { useState, useEffect } from "react";
import "./CreateAppointment.css"
import { createAppointment, getWorkers, portfolio } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

export const CreateAppointment = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        date: "",
        shift: "",
        email: "",
        portfolio_id: "",
    });

    const [appointmentError, setAppointmentError] = useState({
        dateError: "",
        shiftError: "",
        emailError: "",
        portfolio_idError: ""
    });

    useEffect(() => {
        if (!rdxToken) {
            navigate("/");
        }
    }, []);

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

    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {

        let error = "";
        error = validator(e.target.name, e.target.value);

        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Create = () => {
        if (appointment.date != "" &&
            appointment.shift != "" &&
            appointment.email != "" &&
            appointment.portfolio_id != "") {
            const appointmentsWithNumber = {
                ...appointment,
                portfolio_id: parseInt(appointment.portfolio_id, 10),
            };
            createAppointment(appointmentsWithNumber, rdxToken)
                .then((response) => {
                    const { message } = response.data;
                    setMessage(message);
                    if (message == "appointment created succesfully") {
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
        <div className="create-appointment-body">
            <div className="background"></div>
            <div className="pagination-create-appointment">
                <div className="responsive">Create Appointment</div>
            </div>
            <div className="input-card-create-appointment">
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
                    <select name="portfolio_id" onChange={functionHandler} className="select-custom">
                        <option value="">Select a service</option>
                        {gallery.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}, {service.price}€
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
                    title={"Create"}
                    action={() => Create()}
                />
                <div className='errorMsg'>{message}</div>
            </div>
        </div>
    )
}