import React from "react";
import "./CardUser.css";

export const CardUser = ({ full_name, photo, email, phone_number, workerId, is_active, role_id}) => {
    return (
        <div className="card-user" key={workerId}>
            <div className="name">{full_name}</div>
            <img className="photo" src={photo} alt={full_name} />
            <div className="email">{email}</div>
            <div className="phone_number">{phone_number}</div>
            <div className="is_active">{is_active}</div>
            <div className="role_id">{role_id}</div>
        </div>
    );
};
