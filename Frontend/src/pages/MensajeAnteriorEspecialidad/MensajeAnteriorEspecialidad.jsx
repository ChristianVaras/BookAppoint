import React from 'react'
import "./MensajeAnteriorEspecialidad.css";

const MensajeAnteriorEspecialidad = () => {
  return (
    <div>
      <div className='area-mensaje'><p className='mensaje-anterior'>Selecciona una especialidad para ver los medicos disponibles.</p></div>
    <div className="area-imagen">
      <img src="/images/77192-search-doctor.jpg" alt="imagen-de-lupa" className="imagen-lupa" />
    </div>
    </div>
  )
}

export default MensajeAnteriorEspecialidad
