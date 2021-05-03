import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import EstadoRequest from './EstadoRequest'
import Login from './Login/Login'
import Comunes from './Comunes/Comunes'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  estadoRequest : EstadoRequest,
  login : Login,
  comunes : Comunes,
});

export default createRootReducer
