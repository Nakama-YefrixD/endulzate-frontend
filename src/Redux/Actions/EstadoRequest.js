import {
    ESTADO_REQUEST_EXITO,
    ESTADO_REQUEST_NO_AUTORIZADO,
    ESTADO_REQUEST_ERROR_SERVIDOR,
    ESTADO_REQUEST_NO_EXISTE,
    ESTADO_REQUEST_DESCONOCIDO
} from "../../Constantes/EstadoRequest/EstadoRequest";
import {CargandoPaginaReducer} from './Comunes/Comunes'

// REDUCER -> ENVIAR LA DATA DE FETCH A UNA CONSTANTE O ESTADO
export const estadoRequestReducer = (estado) => (dispatch) => {
    dispatch(CargandoPaginaReducer(false))
    if(estado === 200){
        dispatch({
            type: ESTADO_REQUEST_EXITO,
            payload: estado
        })
    }else if(estado === 401){
        dispatch ({
            type: ESTADO_REQUEST_NO_AUTORIZADO,
            payload: estado
        })
    }else if(estado === 404){
        
        dispatch({
            type: ESTADO_REQUEST_NO_EXISTE,
            payload: estado
        })
        
    }else if(estado === 500){
        dispatch({
            type: ESTADO_REQUEST_ERROR_SERVIDOR,
            payload: estado
        })
    }else{
        dispatch({
            type: ESTADO_REQUEST_DESCONOCIDO,
            payload: estado
        })
    }
};