import React, { useState, useEffect } from "react"
import "./Login.css"
import { CustomInput } from "../../common/CustomImput/CustomInput"
import {useNavigate} from "react-router-dom"
import { loginConnection } from "../../services/apiCalls"

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })
    
    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
    useEffect(() => {
        console.log(credentials);
    }, [credentials])
    
    const navigate = useNavigate()
    
    const logMe = () => {
        
        loginConnection(credentials)
        .then(
            resultado =>{
                console.log(resultado.data);
                navigate("/profile")
            }
        )
        .catch(error => console.log(error))
    }
    
    return (
        <div className="login-page">
            <CustomInput
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={"user@gmail.com"}
                functionProp={functionHandler}
            />

            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={"Aa1234@"}
                functionProp={functionHandler}
            />

            <div className="buttonSubmit" onClick={logMe}>Log Me!</div>
        </div>
    )
}