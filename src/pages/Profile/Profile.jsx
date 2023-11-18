import React, { useState, useEffect } from "react";
import "./Profile.css";
import { profileUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { LinkButtonCard } from "../../common/LinkButtonCard/LinkButtonCard";

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
            <div className="background"></div>
            <div className="pagination">
                <div>Your Profile</div>
            </div>
            {
                user
                    ? (
                        <div className="div-info">
                            <div class="card-dinamic">
                                <div class="bg">
                                    <div className="container-profile">
                                        <img src={user.photo} alt="User" className="img-profile" />
                                        <div className="profile-name">Name: {user.full_name}</div>
                                        <div className="profile-email">Email: {user.email}</div>
                                        <div className="profile-phone-number">Phone number: {user.phone_number}</div>
                                    <div className='update-container'>
                                        <LinkButtonCard
                                            path={"/updateProfile"}
                                            title={"Update"}
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div class="blob"></div>
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