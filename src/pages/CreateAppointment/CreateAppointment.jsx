import React, { useState, useEffect } from "react";
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

export const CreateAppointment = () => {

    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        date: "",
        shift: "",
        email: "",
        id: "",
    });

    const [appointmentError, setAppointmentError] = useState({
        dateError: "",
        shiftError: "",
        emailError: "",
        idError: ""
    });

    const [message, setMessage] = useState("");

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
            appointment.id != "") {
            const appointmentsWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 20),
            };
            const token = localStorage.getItem("token");
            createAppointment(appointmentsWithNumber, token)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2500)
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
                <CustomInput
                    design={"inputDesign"}
                    type={"mail"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.emailError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"id"}
                    placeholder={"1"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.idError}</div>
                <div className='buttonSubmit' onClick={Create}>Create Appointment</div>
                <p>{message}</p>
            </div>
        </div>
    )
}