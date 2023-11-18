import React, { useState, useEffect } from "react";
import "./CardAppointment.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";

export const CardAppointment = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker,
    appointmentId, date, shift, priceProduct, emit, client_name, client_email, status, action }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="date-category">
                <div className="link-button-container">
                    <LinkButton
                        classButton={"button-update-appointment"}
                        path={"/updateAppointment"}
                        title={<div className="button-update-appointment" >
                            <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" />
                        </div>}
                        emit={() => emit()}
                    />
                </div>
                <div className="date">
                    <div>Date:</div>
                    <div>{date}</div>
                </div>
                <div className="shift">
                    <div>Shift:</div>
                    <div>{shift}</div>
                </div>
                <div className="service">
                    <div>Service:</div>
                    <div>{categoryProduct}</div>
                </div>
                <div className="nameProduct">
                    <div>Name:</div>
                    <div>{nameProduct}</div>
                </div>
                <div className="status">{status}</div>
                <div className="client_name">{client_name} </div>
                <div className="client_email">{client_email} </div>
            </div>
            <button onClick={toggleCollapse} className="collapsed-button">
                {collapsed ? "Details" : "Hide"}
            </button>
            <div className="prueba">
                {!collapsed && (
                    <div className="card-appointment-right">
                        <div className="card-appointment-flex">
                            <img className="photo" src={imageProduct} alt={nameProduct} />
                            <div className="direction-column">
                                <div className="worker">{nameWorker}</div>
                                <div className="email-worker"> {emailWorker}</div>
                                <div className="priceProduct">{priceProduct} €</div>
                                <DeleteButton
                                    action={() => action()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
