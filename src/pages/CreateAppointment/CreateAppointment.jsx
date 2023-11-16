import React, { useState, useEffect } from "react";
import "./CreateAppointment.css"
import { createAppointment, getWorkers } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

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
            console.log("artists vale...", workers)
        }
    }, [workers]);

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
                    console.log(response.data);
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
        }
    };

    return (
        <div className="createAppointment-body">

            <div className="input-card">

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
                
                {
                    workers.length > 0 &&
                    <select name="email" onChange={functionHandler}>
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
                <div className='errorMsg'>{appointmentError.emailError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"portfolio_id"}
                    placeholder={"1"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.portfolio_idError}</div>
                <div className='buttonSubmit' onClick={Create}>Create Appointment</div>
                <p>{message}</p>
            </div>
        </div>
    )
}