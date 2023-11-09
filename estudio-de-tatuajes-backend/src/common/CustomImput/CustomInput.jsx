import React from "react"
import "./CustomInput.css"

export const CustomInput = ({design, type, name, placeholder, funcionProp}) =>{

    return(
        <input 
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e)=>funcionProp(e)}
        />
    )
}