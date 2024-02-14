//import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './TurnoOnLine.css';

function TurnoOnLine() {

  // const newLocal = "numero-titulo";
  return (
    <div className="superior">
      <div className="cuerpo">
        <div className="enc">
          <h1 className="tit-principal">Crear nuevo turno.</h1>
          <Link to='/seccion' className='close link-underline link-underline-opacity-0'>X</Link>
        </div>
        <p className="par">Sigue el instructivo para solicitar un turno on-line.</p>


        <div className="seu">
          <div className="num-tit">
            <p className="num">1</p>
            <h3 className="tit">Elegir Profesional</h3>
          </div>
          <div className="img-par">
            <img className="img" src="/images/Cross.png" alt="" />
            <p className="par">El primer paso es seleccionar el medico de tu preferencia.</p>
          </div>
        </div>

        <div className="seu">
          <div className="num-tit">
            <p className="num">2</p>
            <h3 className="tit">Seleccionar Fecha</h3>
          </div>
          <div className="img-par">
            <img className="img" src="/images/Cross1.png" alt="" />
            <p className="par">Luego deberás indicar el día de tu asistencia.</p>
          </div>
        </div>

        <div className="seu">
          <div className="num-tit">
            <p className="num">3</p>
            <h3 className="tit">Confirmar Turno</h3>
          </div>
          <div className="img-par">
            <img className="img" src="/images/Cross2.png" alt="" />
            <p className="par">Finalmente, te solicitamos que confirmes el turno asignado.</p>
          </div>
        </div>
        <Link to='/turnos-especialidad' variant="primary" className='btn color-boton w-75 mx-auto my-3'>Comenzar</Link>
      </div>
    </div>







  );
}

export default TurnoOnLine;
