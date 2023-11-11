import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButtom/LinkButtom'

export const Header = () => {

     return (
         <div className='buttom-container'>
            <LinkButton
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                path={"/register"}
                title={"Register"}
            />
             <LinkButton
                path={"/workers"}
                title={"Workers"}
            />
               <LinkButton
                path={"/portfolio"}
                title={"Portfolio"}
            />
               <LinkButton
                path={"/profile"}
                title={"Profile"}
            />
         </div>
     )
}