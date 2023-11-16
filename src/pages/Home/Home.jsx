import React, { useState, useEffect } from "react";
import "./Home.css"
import { getWorkersHome, portfolioHome } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";

export const Home = () => {

    const [workers, setWorkers] = useState([])
    const [flag, setflag] = useState(false)

    useEffect(() => {
        getWorkersHome()
            .then(
                worker => {
                    if (flag == false) {
                        setWorkers(worker.data.data)
                        setflag(true)
                    }
                })
            .catch(error => console.log(error))
    }, [workers])

    const [allPortfolio, setAllPortfolio] = useState([])
    const [flags, setflags] = useState(false)

    useEffect(() => {
        portfolioHome()
            .then(
                product => {
                    if (flag == false) {
                        setAllPortfolio(product.data.data)
                        setflags(true)
                    }
                })
            .catch(error => console.log(error))
    }, [allPortfolio])

    return (
        <div className="container">

            <div className="home-body"></div>
            <div className="container-workers">
                <div className="title-workers">Our Team of Workers</div>
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
                <div className="title-portfolio">Our Top Tattoos and Piercings</div>
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