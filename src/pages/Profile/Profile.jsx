import React, { useState, useEffect } from "react";
import "./Profile.css";
import { profileUser } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";

export const Profile = () => {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        profileUser(token)
            .then((response) => {
                setUser(response.data.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="profile-body">
            {
                user
                    ? (
                        <div className="div-photo">
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