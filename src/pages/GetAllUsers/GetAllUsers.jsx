import React, { useState, useEffect } from "react";
import "./GetAllUsers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { allUsers } from "../../services/apiCalls";

export const GetAllUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (users.length == 0) {
            const token = localStorage.getItem("token")
            allUsers(token)
                .then(user => {
                    console.log(user.data);
                    setUsers(user.data.data)
                })
                .catch(error => console.log(error))
        }
    }, [users])
    console.log(users);

    return (
        <div className="users-body">
            {
                users.length > 0
                    ? (<div className='card-user'>
                        {
                            users.map(user => {
                                if (user.is_active == true) {
                                    user.is_active = "User active"
                                } else if (user.is_active == false) {
                                    user.is_active = "User not active"
                                }
                                if (user.role_id == 1) {
                                    user.role_id = "Client"
                                } else if (user.role_id == 2) {
                                    user.role_id = "Worker"
                                } else if (user.role_id == 3) {
                                    user.role_id = "Super admin"
                                }
                                return (
                                    <CardUser
                                        key={user.id}
                                        photo={user.photo}
                                        full_name={user.full_name}
                                        phone_number={user.phone_number}
                                        email={user.email}
                                        is_active={user.is_active}
                                        role_id={user.role_id}
                                    />
                                )
                            }
                            )}
                    </div>
                    )
                    : (
                        <div>Loading</div>
                    )
            }
        </div>
    )
}