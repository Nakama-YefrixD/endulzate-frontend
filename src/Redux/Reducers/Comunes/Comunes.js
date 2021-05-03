import {
    COMUNES_CARGANDO_PAGINA,
    COMUNES_MOSTRAR_MENU,
    COMUNES_CARGANDO_PAGINA_INICIO,
} from "../../../Constantes/Comunes/Comunes";

const INIT_STATE = {
    ComunesCargandoPagina : true,
    ComunesCargandoPaginaInicio : true,
    ComunesMostrarMenu : false,
    ComunesOcultarMenu : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMUNES_CARGANDO_PAGINA_INICIO : {
        return {
            ...state,
            ComunesCargandoPaginaInicio : action.payload
        }
    }
    case COMUNES_CARGANDO_PAGINA: {
        return {
            ...state,
            ComunesCargandoPagina : action.payload
        }
    }
    case COMUNES_MOSTRAR_MENU: {
        return {
            ...state,
            ComunesMostrarMenu : action.payload.mostrarmenu,
            ComunesOcultarMenu : action.payload.ocultarmenu,
        }
    }
    default:
      return state;
  }
}
