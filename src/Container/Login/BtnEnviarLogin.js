import React from 'react'
import { LoginReducer } from "../../Redux/Actions/Login/Login"
import {useDispatch} from "react-redux";
import { useToasts } from 'react-toast-notifications';

const BtnEnviarLogin = (props) => {

    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const enviarData = async () => {
        
        let login = await dispatch(LoginReducer({
            "usuario" : props.usuario,
            "contrasenia" : props.contrasenia,
        }))
        if(login.respuesta === true){
            addToast(login.mensaje, { appearance: 'success', autoDismiss: true});
            window.location.reload(true);
        }else{
            addToast(login.mensaje, { appearance: 'error', autoDismiss: true});
        }
        console.log(login)
        
    };

    return (
        <div class="container-login100-form-btn">
            <button 
                type="submit" class="login100-form-btn"
                onClick={enviarData}
                // onClick={() => this.enviarData()}
            >
                Iniciar Sesións
            </button>
        </div>
    )
}

export default BtnEnviarLogin
