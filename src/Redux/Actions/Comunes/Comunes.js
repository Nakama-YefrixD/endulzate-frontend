import {
    COMUNES_CARGANDO_PAGINA,
    COMUNES_MOSTRAR_MENU,
    COMUNES_CARGANDO_PAGINA_INICIO
} from "../../../Constantes/Comunes/Comunes";

export const CargandoPaginaReducer = (accion) => {
    return {
        type: COMUNES_CARGANDO_PAGINA,
        payload: accion
    }
}

export const CargandoPaginaInicioReducer = (accion) => {
    return {
        type: COMUNES_CARGANDO_PAGINA_INICIO,
        payload: accion
    }
}

export const MostrarMenuReducer = (accion) => async (dispatch) => {

    if(accion == true){
        dispatch({
            type: COMUNES_MOSTRAR_MENU,
            payload: {
                mostrarmenu : accion,
                ocultarmenu : false
            }
        })
    }else{
        dispatch ({
            type: COMUNES_MOSTRAR_MENU,
            payload: {
                mostrarmenu : true,
                ocultarmenu : true
            }
        })

        setTimeout(() => {
            dispatch ({
                type: COMUNES_MOSTRAR_MENU,
                payload: {
                    mostrarmenu : false,
                    ocultarmenu : false
                }
            })
        }, 1000);
    }
}