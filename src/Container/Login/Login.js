import React, {Component} from 'react';
import '../../Estilos/Login/Login.css'
import bg01 from '../../Assets/assetsLogin/images/bg-01.jpg'
import BtnEnviarLogin from './BtnEnviarLogin'

class Login extends Component{

    constructor(){
        super();
        this.state ={
            input_usuario : "",
            input_contrasenia : ""
        };
    }

    capturarCambioInput(e){
        let variable = e.target.name
        this.setState({
            [variable] : e.target.value
        })
    }

    render(){
        return(
            <div>
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100">
                            <div class="login100-form validate-form">
                                <span class="login100-form-title p-b-34">
                                    Endulzate | Iniciar Sesión
                                </span>
                                
                                <div class="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                                    <input 
                                        id="first-name" class="input100" type="text" name="input_usuario" placeholder="User name" 
                                        onChange={(e) => this.capturarCambioInput(e)}
                                    />
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                                    <input 
                                        class="input100" type="password" name="input_contrasenia" placeholder="Contraseña" 
                                        onChange={(e) => this.capturarCambioInput(e)}
                                    />
                                    <span class="focus-input100"></span>
                                </div>
                                
                                <BtnEnviarLogin 
                                    usuario = {this.state.input_usuario}
                                    contrasenia = {this.state.input_contrasenia}
                                />
                                <div class="w-full text-center p-t-27 p-b-239">
                                    <a href="#" class="txt2">
                                        Usuario / contraseña?
                                    </a>
                                </div>

                            </div>

                            <div class="login100-more" style={{backgroundImage: "url("+bg01+")"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }}
export default Login
