import React, { useState, useEffect } from "react";
import "./Portfolio.css"
import { portfolio } from "../../services/apiCalls";
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const Portfolio = () => {

    const [allPortfolio, setAllPortfolio] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const pageString = page.toString()
        portfolio(pageString)
            .then(
                product => {
                    if (product.data.data.length != 0) {
                        setAllPortfolio(product.data.data)
                    } else {
                        setPage(page - 1)
                    }
                })
            .catch(error => console.log(error))
    }, [page])

    const changePageUpWorkers = () => {
        setPage(page + 1)
    }

    const changePageDownWorkers = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    return (
        <div className="portfolio-body">

            <div className="all-portfolio-body"></div>
            <div className="container-all-portfolio">
                <div className="title-all-portfolio">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownWorkers()}
                    />
                    <div className="responsive">Our Tattoos and Piercings</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpWorkers()}
                    />
                </div>
                <div className="all-portfolio">
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
            </div>
        </div>
    )
}