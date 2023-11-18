import React, { useState, useEffect } from "react";
import "./GetWorkers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { getWorkers } from "../../services/apiCalls";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";

export const GetWorkers = () => {

    const [workers, setWorkers] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const pageString = page.toString()
        getWorkers(pageString)
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

    const changePageUpWorkers = () => {
        setPage(page + 1)
    }

    const changePageDownWorkers = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    return (
        <div className="workers-body">

            <div className="all-workers-body"></div>
            <div className="container-all-workers">
                <div className="title-all-workers">
                    <PaginationButton
                        classPagination={"previus"}
                        text={"Previus"}
                        changePagination={() => changePageDownWorkers()}
                    />
                    <div className="responsive">Our Team of Workers</div>
                    <PaginationButton
                        classPagination={"next"}
                        text={"Next"}
                        changePagination={() => changePageUpWorkers()}
                    />
                </div>
                <div className="all-workers">
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
        </div>
    )
}