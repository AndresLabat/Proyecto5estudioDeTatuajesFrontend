import React from "react";
import "./CardPortfolio.css";

export const CardPortfolio = ({ portfolioId, portfolioName, portfolioCategory,
    portfolioImage, portfolioPrice }) => {
    return (
        <div class="book" key={portfolioId} draggable="false">
            <div className="font">
                <div className="portfolioName">{portfolioName}</div>
                <div className="portfolioCategory">{portfolioCategory}</div>
                <div className="portfolioPrice">{portfolioPrice} €</div>
            </div>
            <div class="cover">
                <img className="portfolioImage" src={portfolioImage} alt={portfolioName} draggable="false" />
            </div>
        </div>
    );
};