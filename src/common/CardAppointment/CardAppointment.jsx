import React from "react";
import "./CardAppointment.css";

export const CardAppointment = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker,
    appointmentId, date, shift, priceProduct }) => {
    return (
        <div className="card" key={appointmentId}>
            <div className="nameProduct">{nameProduct}</div>
            <img className="photo" src={imageProduct} alt={nameProduct} />
            <div className="categoryProduct">{categoryProduct}</div>
            <div className="priceProduct">{priceProduct} €</div>
            <div className="emailWorker">{emailWorker}</div>
            <div className="nameWorker">{nameWorker}</div>
            <div className="appointmentId">{appointmentId}</div>
            <div className="date">{date}</div>
            <div className="shift">{shift}</div>
        </div>
    );
};

