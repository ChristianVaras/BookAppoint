import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "./ConfirmarCita.css";

function ConfirmarTurnos({ appointment }) {
  const navigate = useNavigate();
  const [dataAppointment, setDataAppointment] = useState(appointment);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires", // Cambia esto a la zona horaria que necesites
  };

  useEffect(() => {
    const date = new Date(dataAppointment?.appointmentDate);
    setFormattedDate(date.toLocaleDateString("es-AR", options));
  }, [dataAppointment]);

  console.log("se ve en confirmar turno");
  console.log("medico name en confirmar");

  function confirmacion() {
    Swal.fire({
      icon: 'success',
      html: '<h1>¡Su turno médico ha sido confirmado con éxito!</h1><p>En un momento enviaremos el comprobante del mismo al mail con el que te registraste. Recuerda llevarlo contigo el dia de tu cita.</p>',
      // text: "En un momento enviaremos el comprobante del mismo al mail con el que te registraste. Recuerda llevarlo contigo el dia de tu cita.",
      width: 382, 
           
      confirmButtonText: "Ver turnos confirmados",
      customClass: {
        confirmButton: 'custom-button',
        text: 'texto',
      },
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/seccion");
      }
    });
  }

  return (
    <div>
      {loading ? (
        <div>
          <div className="numero-titulo">
            <p className="numero">3</p>
            <h2 className="titulo">Confirmar turno</h2>
            <p className="parrafo">Para finalizar, te pediremos que confirmes el turno asignado. De lo contrario elegir "Cancelar".</p>
          </div>
          <section className="container p-3 section">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title bg-body-secondary text-center">
                  Información del Turno
                </h5>
                <div className="d-flex row">
                  <div className="col">
                    <p className="card-text">Especialidad:</p>
                    <p className="card-text">Profesional:</p>
                    <p className="card-text">Fecha y Hora:</p>
                    <p className="card-text">Lugar:</p>
                  </div>
                  <div className="col">
                    <p className="card-text">{dataAppointment?.specialty.name}</p>
                    <p className="card-text">{dataAppointment?.doctor.name}</p>
                    <p className="card-text">{formattedDate} hs</p>
                    <p className="card-text">Hospital</p>
                  </div>
                </div>
              </div>
            </div>
            <p>Si no desea el turno puede presionar en Cancelar.</p>
            <div className="container d-flex flex-column">
              <button
                className="btn color-boton mb-3"
                onClick={confirmacion}
              >
                Confirmar turno
              </button>
              <Link
                to="/turnos-especialidad"
                className="btn color-boton2 btn-outline-primary"
                href="#"
              >
                Cancelar
              </Link>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ConfirmarTurnos;
