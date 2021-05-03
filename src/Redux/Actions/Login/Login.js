import {
    MOSTRAR_FORMULARIO_LOGIN,
    OBTENER_LOGIN
} from "../../../Constantes/Login/Login";
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import { CargandoPaginaReducer, CargandoPaginaInicioReducer } from "../Comunes/Comunes"

export const MostrarFormularioReducer = (accion) => {
    return {
        type: MOSTRAR_FORMULARIO_LOGIN,
        payload: accion
    }
}

export const LoginReducer = (usuario) => async (dispatch, getState) => {

    let respuesta = false
    let mensaje = ""

    dispatch(CargandoPaginaReducer(true))
    dispatch(CargandoPaginaInicioReducer(true))

    await fetch(config.api+'api/versiondos/login',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
			}
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest === true){
            respuesta = data.respuesta
            mensaje = data.mensaje
			if(data.respuesta === true){
				localStorage.setItem('usuario', usuario.usuario)
				localStorage.setItem('contrasenia', usuario.contrasenia)

				localStorage.setItem('usuid', data.datos.usuid)
				localStorage.setItem('usutoken', data.datos.usutoken)
				localStorage.setItem('usuusuario', data.datos.usuusuario)
				localStorage.setItem('pernombre', data.datos.pernombre)
				// localStorage.setItem('tpuprivilegio', data.datos.tpuprivilegio)

				dispatch({
					type: OBTENER_LOGIN,
					payload: {
                        usuid   : data.datos.usuid,
                        usuario : data.datos
                    }
				});

			}else{
				dispatch({
					type: OBTENER_LOGIN,
					payload: {
                        usuid   : null,
                        usuario : {}
                    }
				});
			}
		}else{
            respuesta = false
            mensaje = "Lo sentimos, login corrupto"

            dispatch({
                type: OBTENER_LOGIN,
                payload: {
                    usuid   : null,
                    usuario : {}
                }
            });
        }
    }).catch((error)=> {
        respuesta = false
        mensaje = error

        console.log(error)
        dispatch({
            type: OBTENER_LOGIN,
            payload: {
                usuid   : null,
                usuario : {}
            }
        });
    });

    return {
        respuesta : respuesta,
        mensaje : mensaje
    }
}

export const CerrarSesionReducer = () => async (dispatch, getState) => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('contrasenia')
    localStorage.removeItem('usuid')
    localStorage.removeItem('usutoken')
    localStorage.removeItem('usuusuario')
    localStorage.removeItem('pernombre')
    // localStorage.removeItem('tpuprivilegio')
    dispatch ({
        type: OBTENER_LOGIN,
        payload: {
            usuid   : null,
            usuario : {}
        }
    })

}

export const ValidarUsuarioConectadoReducer = () => async (dispatch, getState) => {

    // console.log("LOCAL STORAGE:")
    // console.log(localStorage.getItem('otros'))

    if(localStorage.getItem('usuid')){
        console.log('SI EXISTE')
        // console.log(localStorage.getItem('usuid'))
        // console.log(localStorage.getItem('contrasenia'))
        await dispatch(LoginReducer({usuario: localStorage.getItem('usuario'), contrasenia: localStorage.getItem('contrasenia')}))

    }else{
        console.log('no existe')
        
    }

    dispatch(CargandoPaginaInicioReducer(false))
    dispatch(CargandoPaginaReducer(false))



}