import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { Navigate } from 'react-router-dom';

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {

    const dispatch = useDispatch();
    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        Navigate("/")
    }

    return (
        <div className='button-container'>
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/workers"}
                title={"Workers"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/portfolio"}
                title={"Portfolio"}
            />
            {
                rdxCredentials?.credentials.token
                    ? (
                        <>
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/profile"}
                                title={"Profile"}
                            />
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/appointments"}
                                title={"Appointments"}
                            />
                            <div onClick={logOutMe}>
                                <LinkButton
                                    classButton={"linkButtonDesign"}
                                    path={"/"}
                                    title={"log out"} />
                            </div>
                        </>
                    ) : (
                        <>
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/login"}
                                title={"Login"}
                            />
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/register"}
                                title={"Register"}
                            />
                        </>
                    )
            }

            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/getAllUsers"}
                title={"All Users"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/getAllAppointments"}
                title={"All Appointments"}
            />
        </div>
    )
}