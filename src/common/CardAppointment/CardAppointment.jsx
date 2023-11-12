import React, { useState, useEffect} from "react";
import "./CardAppointment.css";

export const CardAppointment = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker,
    appointmentId, date, shift, priceProduct }) => {

    // const [change, setChange] = useState(true);

    // const callSelectClick = () => {
    //     setChange(!change)
    //     selectFunction()
    // }

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

return (
    <div className="card-appointment" key={appointmentId}>
        <div className="date-category">
            <div>Date: </div>
            <div className="date">{date}</div>
            <div>Shift: </div>
            <div className="shift">{shift}</div>
            <div>Category Product : </div>
            <div className="service">{categoryProduct}</div>
        </div>
        <button className="button-spoiler" onClick={toggleCollapse}>
            {collapsed ? "Details" : "Hide"}
        </button>
        {!collapsed && (
            <div className="card-appointment-right">
                <div className="nameProduct">{nameProduct}</div>
                <img className="photo" src={imageProduct} alt={nameProduct} />
                <div className="priceProduct">{priceProduct}</div>
                <div className="tattoo-artist-card-container">
                    <div>Worker</div>
                    <div className="worker">{nameWorker}</div>
                </div>
                <div className="email">{emailWorker}</div>
                {/* <div className="appointmentId">{appointmentId}</div> */}
            </div>
        )}
    </div>
);
};
