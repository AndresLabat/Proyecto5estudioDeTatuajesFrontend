import React from "react";
import "./CardPortfolio.css";

export const CardPortfolio = ({ portfolioId, portfolioName, portfolioCategory, 
    portfolioImage, portfolioPrice}) => {
    return (
        <div className="card" key={portfolioId}>
            <div className="portfolioName">{portfolioName}</div>
            <img className="portfolioImage" src={portfolioImage} alt={portfolioName} />
            <div className="portfolioCategory">Category: {portfolioCategory}</div>
            <div className="portfolioPrice">{portfolioPrice} €</div>
        </div>
    );
};