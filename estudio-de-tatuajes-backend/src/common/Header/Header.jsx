import React from "react"
import "./Header.css"
import { LinkButton } from "../LinkButton/LinkButton"

export const Header = () =>{

    return (
        <div className="buttonContainer">
            <LinkButton 
                path={"/home"}
                title={"Home"}
            />
            <LinkButton 
                path={"/register"}
                title={"Register"}
            />
            <LinkButton 
                path={"/login"}
                title={"Login"}
            />
            <LinkButton 
                path={"/portfolio"}
                title={"Portfolio"}
            />
            <LinkButton 
                path={"/workers"}
                title={"Workers"}
            />
        </div>
    )
}