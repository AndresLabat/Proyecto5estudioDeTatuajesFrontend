import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

export const Header = () => {

    return (
        <div className='button-container'>
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/register"}
                title={"Register"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/workers"}
                title={"Workers"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/portfolio"}
                title={"Portfolio"}
            />
            <LinkButton
                classButton={"linkButtonDesign"}
                path={"/profile"}
                title={"Profile"}
            />
        </div>
    )
}