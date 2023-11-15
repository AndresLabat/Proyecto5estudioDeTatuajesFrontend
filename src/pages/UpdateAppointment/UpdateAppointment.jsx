import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { updateAppointment } from "../../services/apiCalls";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { selectAppointmentId } from "../appointmentSlice";

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
                    name={"portfolioId"}
                    placeholder={"1"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.portfolioIdError}</div>
                <div className='buttonSubmit' onClick={Update}>Update Appointment</div>
                <p>{message}</p>
            </div>
        </div>
    )
}