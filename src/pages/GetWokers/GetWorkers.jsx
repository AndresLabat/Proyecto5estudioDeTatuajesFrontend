import React, { useState, useEffect } from "react";
import "./GetWorkers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { getWorkers } from "../../services/apiCalls";

export const GetWorkers = () => {

    const [workers, setWorkers] = useState([])

    useEffect(() => {
        if (workers.length === 0) {
            getWorkers()
                .then(worker => {
                    setWorkers(worker.data.data)
                })
                .catch(error => console.log(error))
        }
    }, [workers])

    return (
        <div className="workers-body">
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
    )
}