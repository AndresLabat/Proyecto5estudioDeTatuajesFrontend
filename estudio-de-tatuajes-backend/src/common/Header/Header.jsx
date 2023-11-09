import React from "react"
import "./Header.css"
import { LinkButton } from "../LinkButton/LinkButton"

export const Header = () =>{

    return (
        <div>
            <LinkButton 
                path={"/home"}
                title={"Home"}
            />
        </div>
    )
}