import './style.css';
// import imgsomos from '../../assets/imgquienes.png';
import cruz from '../../assets/cruzsomos.svg';


function QuienesSomos() {
    return (
        <>
        <div className="somos">

            <div className='contimg'>
                {/* <img src={imgsomos} alt="" className='imgquienesSomos mx-auto' /> */}
                <div className='cuadroAzul px-3'>
                <h2 className='mt-4'>¿Quienes somos?</h2>
                <p className='mt-3'>Somos Syncare Hospital, una institución de salud comprometida con el bienestar y la atención médica de calidad. Nuestro equipo de profesionales altamente capacitados y nuestra infraestructura de vanguardia nos permiten brindar servicios médicos de excelencia a nuestros pacientes. 
                    Brindamos:</p>
                <p ><span><img src={cruz} alt="cruzimg" className='parraimg me-1' /></span> Amplia especialización</p>
                <p ><span><img src={cruz} alt="cruzimg" className='parraimg me-1' /></span> Atención Integra</p>
                <p ><span><img src={cruz} alt="cruzimg" className='parraimg me-1' /></span> Tecnologia Avanzada</p>
            
                </div>
            </div>
        </div>

        
        </>
        
    );
}

export default QuienesSomos;