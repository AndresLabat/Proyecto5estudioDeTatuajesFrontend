import React from "react";
import "./CardPortfolio.css";

export const CardPortfolio = ({ portfolioId, portfolioName, portfolioCategory, 
    portfolioImage, portfolioPrice}) => {
    return (
        <div className="card-portfolios" key={portfolioId} draggable="false">
            <div className="portfolioName">{portfolioName}</div>
            <img className="portfolioImage" src={portfolioImage} alt={portfolioName} draggable="false"/>
            <div className="portfolioCategory">Category: {portfolioCategory}</div>
            <div className="portfolioPrice">{portfolioPrice} €</div>
        </div>
    );
};