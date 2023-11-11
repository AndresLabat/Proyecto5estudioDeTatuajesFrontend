import React, { useState, useEffect } from "react";
import "./Profile.css";
import { profileUser } from "../../services/apiCalls";

export const Profile = () => {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)

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
                            <h2>Welcome, {user.full_name}!</h2>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    );
};