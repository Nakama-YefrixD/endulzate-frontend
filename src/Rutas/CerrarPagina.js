import React, {useEffect} from 'react'

const CerrarPagina = () => {

        
    useEffect(() => {
        window.close();
        // alert('cerrar')
    },[])

    window.close();

    return (
        <div>
            
        </div>
    )
}


export default CerrarPagina
