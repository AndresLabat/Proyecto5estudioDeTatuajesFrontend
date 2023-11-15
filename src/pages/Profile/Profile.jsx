import React, { useState, useEffect } from "react";
import "./Profile.css";
import { profileUser } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Profile = () => {

    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
    });

    const [flag, setflag] = useState(false)

    useEffect(() => {
        if (rdxToken) {
            profileUser(rdxToken)
                .then(
                    response => {
                        if (flag == false) {
                            setUser(response.data.data);
                            setflag(true)
                        }
                    })
                .catch(error => console.log(error))
        } else {
            navigate("/");
        }
    }, [user]);

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