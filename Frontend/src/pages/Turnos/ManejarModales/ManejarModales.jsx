import React from 'react'
//import "./ManejarModales.css";
import ModalMedicos from '../MostrarMedicos/MostrarMedicos';

const ManejarModales = ({medicosEspecialidad,idEspecialidad }) => {

    // console.log("esto se ve en manejar modales " + med.name )
    return (
        <div className='modales'>
          {medicosEspecialidad.map((med) => (
              <div key={med._id}>
               <ModalMedicos med={med} idEspecialidad={idEspecialidad} />

              </div>
             ))}

             
            
        </div>
    )
}

export default ManejarModales
