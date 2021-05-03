import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Login from '../Login/Login'
import { ToastProvider } from 'react-toast-notifications';
import Rutas from '../../Rutas/index'
import {ValidarUsuarioConectadoReducer} from '../../Redux/Actions/Login/Login'

function App() {

    const ComunesCargandoPagina = useSelector(({comunes}) => comunes.ComunesCargandoPagina)
    const ComunesCargandoPaginaInicio = useSelector(({comunes}) => comunes.ComunesCargandoPaginaInicio)
    const LoginUsuid = useSelector(({login}) => login.LoginUsuid)

    const dispatch = useDispatch();

    useEffect(async () => {

        console.log('dispa')
        await dispatch(ValidarUsuarioConectadoReducer())
        // console.log(LoginUsuid)
    }, [LoginUsuid]);


    return (
        <div style={{position:'relative'}}>
            <ToastProvider>
                <div style={{position:'absolute', width:'100%', height:'100vh'}}>
                    <div style={{position:'relative'}}>
                        
                        {
                            LoginUsuid != null
                            // ?<div>rutas</div>
                            ?<Rutas />
                            :<Switch>
                                <Route exact path='/login' component={Login}/>
                            </Switch>
                        }
                        
                        {
                            LoginUsuid != null
                            ?null
                            :<Redirect to="/login" />
                        }

                    </div>
                </div>
            </ToastProvider>
        </div>
    );
}

export default App;
