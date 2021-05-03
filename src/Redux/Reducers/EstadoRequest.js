import {
    ESTADO_REQUEST_EXITO,
    ESTADO_REQUEST_NO_AUTORIZADO,
    ESTADO_REQUEST_ERROR_SERVIDOR,
    ESTADO_REQUEST_NO_EXISTE,
    ESTADO_REQUEST_DESCONOCIDO
} from "../../Constantes/EstadoRequest/EstadoRequest";

const INIT_STATE = {
    init_estadoRequest  : 0,
    init_request    : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ESTADO_REQUEST_EXITO: {
        return {
            ...state,
            init_estadoRequest : action.payload,
            init_request       : true
        }
    }
    case ESTADO_REQUEST_NO_AUTORIZADO: {
        return {
            ...state,
            init_estadoRequest: action.payload,
            init_request : false
        }
    }
    case ESTADO_REQUEST_NO_EXISTE: {
        return {
            ...state,
            init_estadoRequest: action.payload,
            init_request : false
        }
    }
    case ESTADO_REQUEST_ERROR_SERVIDOR: {
        return {
            ...state,
            init_estadoRequest: action.payload,
            init_request : false
        }
    }
    case ESTADO_REQUEST_DESCONOCIDO: {
        return {
            ...state,
            init_estadoRequest: action.payload,
            init_request : false
        }
    }
    default:
      return state;
  }
}
