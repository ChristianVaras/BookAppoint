import React from 'react'
import "./Servicios.css";

const Servicios = () => {
    return (
        <div className='base-cuadrado'>
            <div className='cuadrado'>
                <div className='titulo-parrafo'>
                    <h2 className='titulo-servicios'>Servicios.</h2>
                    <p className='parrafo-servicios'>Nos enorgullece ofrecer una amplia gama de atención médica integral para satisfacer las necesidades de nuestros pacientes.</p>
                </div>
                <div className='cuadrados'>
                    <div className='base-nucleo'>
                        <div className='nucleo'>
                            <img src="/images/abrazo.png" className='imagen' alt="" />
                            <h3 className='titulo-nucleo'>Consultas Médicas para Adultos y Niños.</h3>
                            <p className='parrafo-nucleo'>Nuestro equipo de médicos especialistas brinda consultas médicas completas y precisas para pacientes de todas las edades, asegurando un cuidado integral y personalizado.</p>
                        </div>
                    </div>
                    <div className='base-nucleo'>
                        <div className='nucleo'>
                            <img src="/images/operando.png" className='imagen' alt="" />
                            <h3 className='titulo-nucleo'>Cirugias Generales y Especializadas.</h3>
                            <p className='parrafo-nucleo'>Brindamos seguridad, precisión y una recuperación rápida en procedimientos abdominales, de vesícula biliar y especialidades como cirugía cardíaca o cerebral.</p>
                        </div>
                    </div>
                    <div className='base-nucleo'>
                        <div className='nucleo'>
                            <img src="/images/cuidador.png" className='imagen' alt="" />
                            <h3 className='titulo-nucleo'>Rehabilitación Integral.</h3>
                            <p className='parrafo-nucleo'>Ofrecemos un enfoque integral de rehabilitación que incluye terapia física, ocupacional y de lenguaje, con el objetivo de ayudar a nuestros pacientes a recuperar su funcionalidad y mejorar su calidad de vida.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Servicios