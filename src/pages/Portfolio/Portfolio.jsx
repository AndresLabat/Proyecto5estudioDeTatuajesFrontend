import React, { useState, useEffect } from "react";
import "./Portfolio.css"
import { portfolio } from "../../services/apiCalls";
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";

export const Portfolio = () => {

    const [allPortfolio, setAllPortfolio] = useState([])
    const [flag, setflag] = useState(false)

    useEffect(() => {
        portfolio()
            .then(
                product => {
                    if (flag == false) {
                        setAllPortfolio(product.data.data)
                        setflag(true)
                    }
                })
            .catch(error => console.log(error))
    }, [allPortfolio])

    return (
        <div className="portfolio-body">
            {
                allPortfolio.length > 0

                    ? (<div className="card-portfolio">
                        {
                            allPortfolio.map(product => {
                                return (
                                    <CardPortfolio
                                        portfolioId={product.id}
                                        portfolioName={product.name}
                                        portfolioCategory={product.category}
                                        portfolioImage={product.image}
                                        portfolioPrice={product.price}
                                    />
                                )
                            })
                        }
                    </div>)

                    : (
                        <div>Loading...</div>
                    )
            }
        </div>
    )
}