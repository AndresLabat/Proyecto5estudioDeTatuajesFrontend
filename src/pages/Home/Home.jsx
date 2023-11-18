import React, { useState, useEffect } from "react";
import "./Home.css"
import { getWorkersHome, portfolioHome } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const Home = () => {

    const [workers, setWorkers] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const pageString = page.toString()
        getWorkersHome(pageString)
            .then(
                worker => {
                    if (Array.isArray(worker.data.data)) {
                        setWorkers(worker.data.data)
                    } else {
                        setPage(page - 1)
                    }
                })
            .catch(error => console.log(error))
    }, [page])

    const [allPortfolio, setAllPortfolio] = useState([])
    const [pages, setPages] = useState(1)

    useEffect(() => {
        const pagesString = pages.toString()
        portfolioHome(pagesString)
            .then(
                product => {
                    if (product.data.data.length != 0) {
                        setAllPortfolio(product.data.data)
                        console.log(product.data.data);
                    } else {
                        setPages(pages - 1)
                    }
                })
            .catch(error => console.log(error))
    }, [pages])

    const changePageUpWorkers = () => {
        setPage(page + 1)
    }

    const changePageDownWorkers = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    const changePageUpPorfolio = () => {
        setPages(pages + 1)
    }

    const changePageDownPortfolio = () => {
        if (pages >= 2) {
            setPages(pages - 1)
        }
    }

    const handleClick = () => {
        const overlayDiv = document.querySelector('.container-image-studio');
        if (overlayDiv) {
            overlayDiv.style.visibility = 'hidden';
        }
    };

    return (
        <div className="container">
            <div className="container-image-studio"  onClick={handleClick}>
                <img src="../../../img/estudio home2.png" alt="home" className="img-welcome"/>
                <img src="../../../img/noland-logo2.png" alt="noland" className="noland-logo-welcome"/>
            </div>
            <div className="home-body"></div>
            <div className="container-workers">
                <div className="title-workers">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownWorkers()}
                    />
                    <div>Our Team of Workers</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpWorkers()}
                    />
                </div>
                <div className="workers">
                    {
                        workers.length > 0
                            ? (<div className="card-worker">
                                {
                                    workers.map(worker => {
                                        return (
                                            <CardUser
                                                workerId={worker.id}
                                                full_name={worker.full_name}
                                                photo={worker.photo}
                                                email={worker.email}
                                                phone_number={worker.phone_number}
                                                is_active={"Active"}
                                                role_id={"Worker"}
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

            <div className="container-portfolio">
                <div className="title-portfolio">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownPortfolio()}
                    />
                    <div>Our Top Tattoos and Piercings</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpPorfolio()}
                    />
                </div>
                <div className="div-portfolio">
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