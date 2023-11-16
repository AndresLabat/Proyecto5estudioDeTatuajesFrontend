import React, { useState, useEffect } from "react";
import "./Home.css"

export const Home = () => {
    return (
        <div className="container">
            <div className="home-body"></div>
            <div className="container-workers">
                <div>NUESTROS WORKERS</div>
            </div>
            <div className="container-portfolio">
                <div>NUESTRO PORTFOLIO</div>
            </div>
        </div>
    )
}