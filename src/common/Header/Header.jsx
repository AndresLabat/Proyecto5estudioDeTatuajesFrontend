import React, { useEffect, useState } from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";

export const Header = () => {

    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null)

    useEffect(() => {
        if (rdxToken) {
            try {
                const decoded = jwtDecode(rdxToken);
                console.log(decoded);
                console.log(decoded.role);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [rdxToken]);

    const logOutMe = () => {
        dispatch(logout());
        Navigate("/");
    };

    return (
        <div className='header'>
            <div className='div-image-header'><img className="img-logo" src="../../../img/noland-logo2.png" alt="" /></div>
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
                    rdxToken
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
                                        title={"Log Out"} />
                                </div>
                                {
                                    decodedToken && decodedToken.role === "super_admin" &&
                                    (
                                        <>
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
                                        </>
                                    )
                                }
                            </>
                        )
                        : (
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
            </div>
        </div>
    )
}