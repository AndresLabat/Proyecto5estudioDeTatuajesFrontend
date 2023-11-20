import React, { useState, useEffect } from "react";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validators";
import { updateUser } from "../../services/apiCalls";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

export const UpdateProfile = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        full_name: "",
        password: "",
        phone_number: "",
        photo: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        full_nameError: "",
        passwordError: "",
        phone_numberError: "",
        photoError: ""
    });

    useEffect(() => {
        if (!rdxToken) {
            navigate("/");
        }
    }, []);

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {

        let error = "";
        error = validator(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const photoDefault = (photo) => (photo === "" ? undefined : photo);

    const update = () => {
        if (
            validatePassword(credentials.password)=="ok"&&
            credentials.password != "" &&
            credentials.full_name != "" &&
            credentials.phone_number != ""
            ) {
            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10),
                photo: photoDefault(credentials.photo)
            };
            updateUser(credentialsWithNumber, rdxToken)
                .then((response) => {
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/profile");
                        }, 1000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    
        if (!password) {
            return {
                success: true,
                mensaje: 'you must insert a password'
            };
        } else if (typeof (password) !== "string") {
            return {
                success: true,
                mensaje: 'password incorrect, you can put only strings, try again'
            };
        } else if (password.length > 100) {
            return {
                success: true,
                mensaje: 'password too long, try to insert a shorter name, max 100 characters'
            };
        } else if (!passwordRegex.test(password)) {
            return {
                success: true,
                mensaje: 'password incorrect, try again'
            };
        } else {
            return "ok"
        }
    };

    return (
        <div className="register-body">
            <div className="background"></div>
            <div className="paginations">
                <div className="responsive">Update Your Profile</div>
            </div>
            <div className="input-card-update">
                <div className="flex">
                    <div className="obligation">*</div>
                    <CustomInput
                        design={"inputDesign"}
                        type={"name"}
                        name={"full_name"}
                        placeholder={"David Ochando"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                </div>
                <div className='errorMsg'>{credentialsError.full_nameError}</div>

                <div className="flex">
                    <div className="obligation">*</div>
                    <CustomInput
                        design={"inputDesign"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Aa1234@"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                </div>
                <div className='errorMsg'>{credentialsError.passwordError}</div>

                <div className="flex">
                    <div className="obligation">*</div>
                    <CustomInput
                        design={"inputDesign"}
                        type={"number"}
                        name={"phone_number"}
                        placeholder={"666666666"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                </div>
                <div className='errorMsg'>{credentialsError.phone_numberError}</div>
                <div className="margin-left">
                    <CustomInput
                        design={"inputDesign"}
                        type={"text"}
                        name={"photo"}
                        placeholder={"URL photo"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                </div>
                <div className='errorMsg'>{credentialsError.photoError}</div>
                <LinkButtonCard
                    title={"Update"}
                    action={() => update()}
                />

                <p className='errorMsg'>{message}</p>
            </div>
        </div>
    )
}
