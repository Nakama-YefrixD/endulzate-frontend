import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Top from './partials/topNav/top'
import Sidebar from './partials/sidebar'
import Footer from './partials/footer'
import Almacen from './almacenes/Almacen'
import Entrada from './almacenes/Entrada'
import Marca from './almacenes/Marca'
import Proveedores from './almacenes/Proveedores'
import Tipoproducto from './almacenes/Tipoproducto'
import Queso from './almacenes/queso'
import Descuentos from './Configuracion/descuentos/index'
import Usuarios from './Configuracion/Usuario'
import Reportes from './Configuracion/Reportes/Reportes'
import Ventas from './ventas/Venta'
import VentasDetalladas from './ventas/ventasDetalladas/index'
import indexTransferencias from './transferencias/index'
import indexCajaVenta from './caja/gestionarCajas/index'
import indexGasto from './caja/gestionarGastos/index'
import indexIngresos from './caja/gestionarIngresos/index'
import CargaArchivos from './Configuracion/cargaArchivos/index'

import CargarData from './almacenes/CargarData/CargarData'
import CerrarPagina from './CerrarPagina'

const index = () => {    

    return (
        <BrowserRouter>
            <div>
                <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
                </div>
                <div id="main-wrapper">
                <Top/>
                <Sidebar/>
                <div className="page-wrapper">
                    <div className="page-breadcrumb bg-white">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-xs-12 align-self-center">
                                <h5 className="font-medium text-uppercase mb-0">Dashboard</h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-xs-12 align-self-center">
                                <nav aria-label="breadcrumb" className="mt-2 float-md-right float-left">
                                    <ol className="breadcrumb mb-0 justify-content-end p-0 bg-white">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-content container-fluid">
                        <Switch>
                        <Route exac path='/queso' component={Queso} />

                        {/* <Route
                            path="/almacen"
                            render={({ match: { url } }) => (
                            <>
                                
                            </>
                            )}
                        /> */}

                        <Route path={`/cerrar-pagina`} component={CerrarPagina} exact />
                        <Route path={`/almacen`} component={Almacen} exact />
                        <Route path={`/almacen-transferencias`} component={indexTransferencias} />
                        <Route path={`/almacen-entrada`} component={Entrada} />
                        <Route path={`/almacen-marcas`} component={Marca} />
                        <Route path={`/almacen-proveedor`} component={Proveedores} />
                        <Route path={`/almacen-tiposproductos`} component={Tipoproducto} />
                        <Route path={`/almacen-cargar-data`} component={CargarData} />

                        {/* <Route
                            path="/configuracion"
                            render={({ match: { url } }) => (
                            <>
                                
                            </>
                            )}
                        /> */}

                        <Route path={`/configuracion-ofertas`}  component={Descuentos} />
                        <Route path={`/configuracion-usuarios`} component={Usuarios} />
                        <Route path={`/configuracion-carga-archivos`} component={CargaArchivos} />

                        <Route exac path='/ventas' component={Ventas} />
                        <Route exac path='/ventasdetalladas' component={VentasDetalladas} />
                        <Route exac path={`/seguimientos`} component={Reportes} />
                        {/* <Route
                            path="/caja"
                            render={({ match: { url } }) => (
                            <>
                                
                            </>
                            )}
                        /> */}
                        <Route path={`/caja`}         component = {indexCajaVenta} exact />
                        <Route path={`/caja-ingresos`} component = {indexIngresos} />
                        <Route path={`/caja-gastos`}   component = {indexGasto} />
                        </Switch>
                    </div>
                    <Footer/>
                </div>
                </div>
            </div>              
        </BrowserRouter>
    )
}

export default index
