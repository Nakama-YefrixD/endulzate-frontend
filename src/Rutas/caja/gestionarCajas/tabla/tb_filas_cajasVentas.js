import React from 'react'
import {Component} from 'react';
import cogoToast from 'cogo-toast';
import config from '../../../../config'

class TB_filas_cajasVentas extends Component {
    
    constructor(){
        super();
        this.state ={

        }
        this.fetchImprimirCaja = this.fetchImprimirCaja.bind(this)
        this.textInputCierre = React.createRef();
    }

    fetchImprimirCaja(){
        this.textInputCierre.current.click();
        let url = config.apiTicket+`/api/imprimir/cierreCaja/`+this.props.idCajaVenta;

        cogoToast.loading(
            <div>
                <h4>IMPRIMIENDO CAJA N°{this.props.numeroCajaVenta}</h4>
            </div>, 
            {
                position: 'top-right'
            }
            
        )
        .then(() => {
            fetch(url,
                {
                    method: 'GET',
                }
            )
            .then(response => response.json())
            .then(data => {
    
                if(data['respuesta'] == true){
                    cogoToast.success(
                        <div>
                            <h4>IMPRESIÓN CORRECTA</h4>
                        </div>, 
                        {
                          position: 'top-right'
                        }
                    );
                    this.props.fetchVentaDataTabla(1, '', '');
    
                }else{
                    cogoToast.error(
                        <div>
                            <h4>HUBO UN PROBLEMA AL IMPRIMIR LA CAJA</h4>
                        </div>, 
                        {
                          position: 'top-right'
                        }
                    );
                }
                
            })
            
        });
        
    }

    render(){
        return(
            <tr>
                <a 
                    ref    = {this.textInputCierre}
                    href   = {config.apiTicket+`/api/imprimir/cierreCaja/`+this.props.idCajaVenta}
                    target = "_blank" 
                    style={{display:'none'}}
                ></a>
                <td>
                    <button 
                        className="btn btn-rounded btn-fw btn-primary" 
                        style={{background:'green'}}
                        onClick={() => this.fetchImprimirCaja()}
                        type="button" >
                            <i className="mdi mdi-printer"></i>
                    </button>

                    <button 
                        
                        className="btn btn-rounded btn-fw btn-primary" 
                        type="button" >
                            <i className="mdi mdi-eye"></i>
                    </button>
                </td>
                <td>{this.props.nombreSurcursal }</td>
                <td>{this.props.nombreUsuario }</td>
                <td>{this.props.cierreCajaVenta }</td>
                <td>{this.props.numeroCajaVenta }</td>
                <td>{this.props.aperturaCajaVenta }</td>
                <td>{this.props.cierreCajaVenta }</td>
                <td>{(this.props.totalAperturaCajaVenta) }</td>
                <td>{(this.props.totalAperturoCajaVenta) }</td>
                <td>{this.props.totalCierreCajaVenta }</td>
                <td>{this.props.totalCerroCajaVenta }</td>
                <td>{this.props.numeroVentasTarjetaCajaVenta }</td>
                <td>{this.props.totalVentasTarjetaCajaVenta }</td>
                <td>{this.props.numeroVentasEfectivoCajaVenta }</td>
                <td>{this.props.totalVentasEfectivoCajaVenta }</td>
                <td>{this.props.numeroVentasCanceladasCajaVenta }</td>
                <td>{this.props.totalVentasCanceladasCajaVenta }</td>
                <td>{this.props.numeroGastosCajaVenta }</td>
                <td>{this.props.totalGastosCajaVenta }</td>
                <td>{this.props.numeroIngresosCajaVenta }</td>
                <td>{this.props.totalIngresosCajaVenta }</td>
                <td>{this.props.numeroVentasCajaVenta }</td>
                <td>{this.props.totalVentasCajaVenta }</td>
                <td>{this.props.numeroItemsCajaVenta }</td>
                <td>{this.props.numeroItemsCanceladosCajaVenta }</td>
                <td>{this.props.observacionesAperturaCajaVenta }</td>
                <td>{this.props.observacionesCierreCajaVenta }</td>
            </tr>
         ) 
    }
}

export default TB_filas_cajasVentas