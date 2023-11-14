import React, { useState, useEffect } from "react";
import "./Profile.css";
import { profileUser } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { Navigate } from "react-router-dom";

export const Profile = () => {

    const rdxToken = useSelector(selectToken);

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
    });

    useEffect(() => {
        if (rdxToken) {
            profileUser(rdxToken)
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch(error => console.log(error))
        } else {
            Navigate("/login");
        }
    }, []);

    return (
        <div className="profile-body">
            {
                user
                    ? (
                        <div className="div-info">
                            <img src={user.photo} alt="User" />
                            <div>Name: {user.full_name}</div>
                            <div>Email: {user.email}</div>
                            <div>Phone number: {user.phone_number}</div>
                            <div className='update-container'>
                                <LinkButton
                                    classButton={"pruebaButtom"}
                                    path={"/updateProfile"}
                                    title={"Update"}
                                />
                            </div>
                        </div>
                    )
                    : (
                        <div>Loading...</div>
                    )
            }
        </div>
    );
};