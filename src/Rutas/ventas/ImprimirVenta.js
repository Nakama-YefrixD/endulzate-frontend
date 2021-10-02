import React from 'react'
import {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import cogoToast from 'cogo-toast';
import config from '../../config'
import axios from "axios";

class ImprimirVenta extends Component {
    
    constructor(){
        super();
        this.state ={
            txt_motivoCancelar  : '',
            colorToastDanger    : 'rgba(205,55,55,0.7)',
            colorToastSuccess   : 'rgba(76,208,76,0.7)'

        }
        this.textInput = React.createRef();
        this.fetchImprimirVenta       = this.fetchImprimirVenta.bind(this);
    }

    fetchImprimirVenta(){
        let url = config.apiTicket+`/api/imprimir/venta/`+this.props.idVenta;
        this.textInput.current.click();
        cogoToast.loading(
            <div>
                <h4>IMPRIMIENDO VENTAS</h4>
            </div>, 
            {
                position: 'top-right'
            }
            
        )
        .then(() => {
            axios.get(url)
            // fetch(url,
            //     {
            //         method: 'GET',
            //     }
            // )
            // .then(response => response.json())
            // .then(data => {
    
            //     if(data['respuesta'] == true){
            //         cogoToast.success(
            //             <div>
            //                 <h4>IMPRESIÓN CORRECTA</h4>
            //             </div>, 
            //             {
            //               position: 'top-right'
            //             }
            //         );
            //         this.props.fetchVentaDataTabla(1, '', '');
    
            //     }else{
            //         cogoToast.error(
            //             <div>
            //                 <h4>HUBO UN PROBLEMA AL IMPRIMIR LA VENTA</h4>
            //             </div>, 
            //             {
            //               position: 'top-right'
            //             }
            //         );
            //     }
                
            // })
            
        });
        
    }
    

    render(){
        return(
            <>
                <button 
                    style       = {{marginLeft:'10px', background:'green'}}
                    type        = "button" 
                    id          = "btn_venta"
                    onClick     = {this.fetchImprimirVenta}
                    className   = "btn btn-danger btn-rounded btn-fw">
                        <i className="mdi mdi-printer"></i>
                </button>
                
                <a 
                    ref    = {this.textInput}
                    href   = {config.apiTicket+`/api/imprimir/venta/`+this.props.idVenta}
                    target = "_blank" 
                    style={{display:'none'}}
                ></a>
            
            </>
         ) 
    }
}

export default ImprimirVenta