import React, { useState, useEffect } from "react";
import "./Login.css"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { logUser } from "../../services/apiCalls";
import { validator } from "../../services/validators";

//Rdx escritura
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

//Rdx lectura
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

export const Login = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
    });

    useEffect(() => {
        if (rdxToken) {
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

    const logMe = () => {
        if (credentials.password != "" && credentials.email != "") {
            logUser(credentials)
                .then((response) => {
                    const { message, token } = response.data;
                    setMessage(message);
                    if (message == "user logged succesfully") {
                        dispatch(login(token))
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

    return (
        <div className="login-body">
            <div className="background"></div>
            <div className="pagination-login">
                <div>Login</div>
            </div>
            <div className="input-card-login">
                <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.emailError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Aa1234@"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.passwordError}</div>
                <LinkButtonCard
                    title={"Log in"}
                    action={() => logMe()}
                />
                <p className='errorMsg'> {message}</p>
            </div>
        </div>
    )
}