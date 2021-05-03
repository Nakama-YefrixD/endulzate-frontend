import React from 'react'
import {useDispatch} from "react-redux";
import { CerrarSesionReducer } from "../../../Redux/Actions/Login/Login"

const BtnCerrarSesion = () => {

    const dispatch = useDispatch()


    return (
        <a 
            onClick={() => dispatch(CerrarSesionReducer())}
            className="dropdown-item" href="#">
                <i className="fa fa-power-off mr-1 ml-1"></i> 
                Salir
        </a>
    )
}

export default BtnCerrarSesion
