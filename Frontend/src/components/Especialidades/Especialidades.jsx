/* eslint-disable react/prop-types */
import './Style.css';
const Especialidades = ({especialidad})=>{
    return <div className='col-12 col-lg-4 d-flex align-items-center p-3'>
        <img src="/images/logo-esp.svg" style={{ 
                    width:"20px",
                    height:"20px",
            }} alt={especialidad} />
        <h5 className='ms-3' style={{ 
                    color: "#FAFAFA",
                    fontFamily: "'Poppins', 'sans-serif'",
                    fontWeight: '500',
                    fontSize: '22px',
                    lineHeight: '130%',
                    
            }}>{especialidad}</h5>
    </div>
};

export default Especialidades;