import React from "react";
import "./CardUser.css";

export const CardUser = ({ full_name, photo, email, phone_number, workerId, is_active, role_id }) => {
    return (
        <div class="flip-card" key={workerId}>
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img className="flip-image" src={photo} alt={full_name} />
                </div>
                <div class="flip-card-back">
                    <div className="name">{full_name}</div>
                    <div className="email">{email}</div>
                    <div className="phone_number">{phone_number}</div>
                    <div className="is_active">{is_active}</div>
                    <div className="role_id">{role_id}</div>
                </div>
            </div>
        </div>
    );
};
