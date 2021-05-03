import React, {Component} from 'react'
import '../../../Estilos/CargarData/CargarData.css'
import config from '../../../config'
import axios from 'axios'

class CargarData extends Component {
    constructor(){
        super();
        this.state = {
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null,
            cargando         : false,
            archivoExito     : false,
            enviarCambios    : false,
            guardarCambios   : false,
        }
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.enviarCambios = this.enviarCambios.bind(this)
    }

    seleccionarFile(e) {
        console.log(localStorage.getItem('usutoken'))
        this.refs.subirArchivoInput.click();
    }

    async cambioInputFile(event){
        event.stopPropagation();
        event.preventDefault();
        this.state.fileSeleccionado = event.target.files[0];

        this.setState({
            subioArchivo  : true,
            nombreArchivo : this.state.fileSeleccionado['name']
        })
    }

    async enviarCambios(){
        this.setState({
            cargando : true
        })

        const formData = new FormData();
        formData.append('file',this.state.fileSeleccionado)
        
        let url = config.api+"/api/versiondos/cargar-data/almacenv2"
        await axios.post(url, formData,{
            mode:'cors',
            headers: {
                'Accept' : 'application/json',
                'content-type': 'multipart/form-data',
                'api-token': localStorage.getItem('usutoken'),
                'usuid'         : localStorage.getItem('usuid')
            }
        })
        .then(rpta => {
            let datos = rpta.data
            if(datos.respuesta == true){
                this.setState({
                    archivoExito : true
                })
            }else{
                this.setState({
                    archivoExito : false
                })
                // message.error(datos.mensaje);
            }
        })
        .catch((error)=> {
            console.log(error)
            this.setState({
                cargando : false,
                archivoExito : false
            })
        });
        

        this.setState({
            enviarCambios   : true,
            guardarCambios  : false,
            cargando        : false,
            fileSeleccionado: null
        })

        this.eliminarArchivo()
    }

    eliminarArchivo(){
        this.setState({
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null
        })
    }



    render() {
        return (
            <div>
                <input 
                    type="file" 
                    id="file" 
                    ref="subirArchivoInput" 
                    style={{display: "none"}} 
                    onChange={(e) => this.cambioInputFile(e)} />

                <div id="Contenedor-Card-CargarData">
                    <div id="Titulo-Card-CargarData">Cargar Almacen</div>
                    <div id="Botones-Card-CargarData">
                        <div>
                            {
                                this.state.fileSeleccionado
                                ?<><div>{this.state.nombreArchivo}</div></>
                                :null
                            }
                            {
                                this.state.fileSeleccionado
                                ?<div 
                                    id="Btn-EnviarArchivo-CargarData"
                                    onClick={this.enviarCambios}
                                >Enviar Archivo</div>
                                :<div 
                                    id="Btn-SeleccionarArchivo-CargarData"
                                    onClick={this.seleccionarFile}
                                >Seleccionar Archivo</div>
                            }
                            <div id="Btn-DescargarFormato-CargarData">Descargar Formato</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CargarData;
