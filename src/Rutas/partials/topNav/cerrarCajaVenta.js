import React from 'react'
import {Component} from 'react';
import { Link } from 'react-router-dom'
import './cerrarCaja.css'
// Confirmar
import confirmarFuncion from '../../extras/confirmarFuncion'

// Loading
import Loading from '../../extras/loading'

// TOAST
import cogoToast from 'cogo-toast';
import config from '../../../config'

class CerrarCajaVentaComponente extends Component {
    
    constructor(){
        super();
        this.state ={
            totalCerro            : '',
            observacionesCierre   : '',

            colorToastDanger    : 'rgba(205,55,55,0.7)',
            colorToastSuccess   : 'rgba(76,208,76,0.7)',
            
            imprimir            : 0,

            mostrarErrorInput : false,
            idCajaSeleccionada : 0

        }
        this.textInputCierre = React.createRef();
        this.getCambioTotalCerro        = this.getCambioTotalCerro.bind(this);
        this.getCambioObservacionCierre = this.getCambioObservacionCierre.bind(this);
        this.activarConfirmacion        = this.activarConfirmacion.bind(this);
        this.sendCierreCajaVenta        = this.sendCierreCajaVenta.bind(this);

    }

    getCambioTotalCerro(e){

        let numeros = parseFloat(this.props.totalCierre).toFixed(2)

        const {name , value} = e.target;
        
        if(numeros != value){
            this.setState({
                mostrarErrorInput : true
            })
        }else{
            this.setState({
                mostrarErrorInput : false
            })
        }

        this.setState({
            totalCerro  : value
        })
    }

    getCambioObservacionCierre(e){
        const {name , value} = e.target;
        this.setState({
            observacionesCierre : value
        })

    }

    activarConfirmacion(numeroImpresion){
        this.setState({
            imprimir : numeroImpresion
        })

        this.props.modalCerrarCajaVenta();
        confirmarFuncion(
            "CERRAR CAJA",
            "Al confirmar esta acción no podremos realizar mas ventas, hasta volver abrir caja",
            this.sendCierreCajaVenta
        );
    }

    sendCierreCajaVenta(){ //SI IMPRIMIR ES 1 IMPRIMIR, SI NO, NO IMPRIMIR

        cogoToast.loading(
            <div>
                <h4>CERRANDO CAJA</h4>
            </div>, 
            {
                position: 'top-right'
            }
            
        ).then(() => {
                fetch(config.api+`/caja/venta/cierre`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            // '_token'                 : csrf_token,
                            'idCajaVenta'            : this.props.idCajaVenta,    
                            'totalCerro'             : this.state.totalCerro,
                            'observacionCierre'      : this.state.observacionesCierre,
                        }),
                        headers: {
                            'Accept'        : 'application/json',
                            'Content-Type'  : 'application/json',
                            'usuid'         : localStorage.getItem('usuid')
                        }
                    }
                )
                .then(response => response.json())
                .then(data => {
                    
                    console.log(data)
                    if(data['respuesta']){
                        cogoToast.success(
                            <div>
                                <h4>LA CAJA SE CERRO SATISFACTORIAMENTE</h4>
                            </div>, 
                            {
                              position: 'top-right'
                            }
                        );
                        // this.props.activarToast('El cierre de caja fue exitoso', this.state.colorToastSuccess);
                        this.setState({
                            totalCerro              : '',
                            observacionesCierre     : '',
                            idCajaSeleccionada      : data['idCaja'],
                        });

                        if(this.state.imprimir == 1){
                            // let url = `http://localhost/api/imprimir/cierreCaja/`+data['idCaja'];
                            let url = config.apiTicket+`api/imprimir/cierreCaja/`+data['idCaja'];
                            cogoToast.loading(
                                <div>
                                    <h4>IMPRIMIENDO CIERRE DE CAJA</h4>
                                </div>, 
                                {
                                    position: 'top-right'
                                }
                                
                            )
                            .then(() => {
                                fetch(
                                    url
                                )
                                .then(
                                    res => res.json()
                                )
                                .then(
                                    data => {
                                        if(data['respuesta']){
                                            cogoToast.success(
                                                <div>
                                                    <h4>COPIA DE CIERRE DE CAJA FINALIZADA</h4>
                                                </div>, 
                                                {
                                                position: 'top-right'
                                                }
                                            );
                                        }else{
                                            cogoToast.error(
                                                <div>
                                                    <h4>NO SE PUDO CONECTAR CON LA IMPRESORA</h4>
                                                </div>, 
                                                {
                                                position: 'top-right'
                                                }
                                            );
                                        }
                                    }
                                )
                            });
                        }

                        this.props.getEstadoCajaVent();

                    }else{
                        cogoToast.error(
                            <div>
                                <h4>HUBO UN PROBLEMA AL MOMENTO DE CERRAR CAJA</h4>
                            </div>, 
                            {
                              position: 'top-right'
                            }
                        );
                        // this.props.activarToast('Hubo un problema al momento de cerrar caja', this.state.colorToastDanger)
                    }
                    
                })
                .then(() => {
                    if(this.state.imprimir == 1){
                        this.textInputCierre.current.click();
                    }
                })
            }
        )
    }

    render(){
        return(
            <div className="card card-default">
                <div className="modal-body">
                    <div className="card-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <label>SUCURSAL</label>
                                    <h4 className="card-title">{this.props.sucursalNombre} </h4>
                                </div>
                                <div className="col-6">
                                    <label>USUARIO CONECTADO</label>
                                    <h4 className="card-title"> {this.props.usuarioNombre} </h4>
                                </div>
                            </div>
                        </div>
                        <div className="form-group" >
                            <div className="row">
                                <div className="col-6">
                                    <label>DINERO APERTURADO</label>
                                    <h4 className="card-title">{this.props.totalApertura } </h4>
                                </div>
                                <div className="col-6">
                                    <label>DINERO CON EL QUE SE APERTURO</label>
                                    <h4 className="card-title">{this.props.totalAperturo } </h4>
                                </div>
                            </div>
                        </div>
                        <div className="form-group" >
                            <div className="row">
                                <div className="col-6">
                                    <label>DINERO DE CIERRE DE CAJA</label>
                                    {
                                        this.props.loadModalCierreCajaVenta
                                        ?<Loading
                                        />
                                        :<h4 className="card-title">{parseFloat(this.props.totalCierre).toFixed(2) } </h4>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="form-group" >
                            <div className="row"> 
                                <div className="col-12">
                                    <label>Dinero para cerrar caja</label><br/>
                                    <input 
                                        type        = "number" 
                                        
                                        onChange    = {this.getCambioTotalCerro}
                                        value       = {this.state.totalCerro}
                                        autoFocus
                                        id={
                                            this.state.mostrarErrorInput == true
                                            ?"Input-Cerrar-Caja-Error"
                                            :"Input-Cerrar-Caja"
                                            
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                                <div className="col-12">
                                    <label>Comentario (opcional)</label>
                                    <textarea 
                                        className   = "form-control" 
                                        rows        = "3" 
                                        placeholder = "Comentario"
                                        onChange    = {this.getCambioObservacionCierre}
                                        value       = {this.state.observacionesCierre}
                                    >

                                    </textarea>
                                </div>                                        
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-12">
                                    <h4 className="card-title">Si el dinero en la caja no cuadra con el del sistema, ingresar sin preocupaciones, dejando un comentario del asunto o acción realizada</h4>
                                </div>
                            </div>
                        </div>
                        <div className="form-group boton">
                            <div className="row">
                                <div className="col-6">
                                    <button 
                                        type="button" 
                                        className="addexis form-control btn btn-block btn-danger btn-lg" 
                                        id="crearProducto" 
                                        onClick     = {
                                            () => this.activarConfirmacion(1)
                                        }
                                    >
                                        CERRAR E IMPRIMIR CAJA</button>
                                </div>

                                <div className="col-6">
                                    <button 
                                        type="button" 
                                        className="addexis form-control btn btn-block btn-danger btn-lg" 
                                        onClick     = {
                                            () => this.activarConfirmacion(0)
                                        }
                                    >
                                        CERRAR CAJA</button>
                                </div>

                                <a 
                                    ref    = {this.textInputCierre}
                                    href   = {config.apiTicket+`api/imprimir/cierreCaja/`+this.state.idCajaSeleccionada}
                                    target = "_blank" 
                                    style={{display:'none'}}
                                ></a>
                                {/* <div className="col-6">
                                    <Link to="/almacen">
                                        <button 
                                            type="button" 
                                            className="addexis form-control btn btn-block btn-info btn-lg" 
                                            
                                            >
                                            VISUALIZAR CAJA</button>
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         ) 
    }

}

export default CerrarCajaVentaComponente