import React from "react";
import "./CardUser.css";

export const CardUser = ({ full_name, photo, email, phone_number, workerId}) => {
    return (
        <div className="card" key={workerId}>
            <div className="name">{full_name}</div>
            <img className="photo" src={photo} alt={full_name} />
            <div className="email">{email}</div>
            <div className="phone_number">{phone_number}</div>
        </div>
    );
};
