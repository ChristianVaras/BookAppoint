import "./seccion.css";
import { api } from "../../../utilities/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Seccion = () => {
  const [user, setUser] = useState({});
  const [pastAppointments, setPastAppoinments] = useState([]);
  const [upcomingAppointments, setUpcomingAppoinments] = useState([]);
  const [loading, setLoading] = useState(true);
  //Datos del Paciente
  useEffect(() => {
    api()
      .get("/auth/me")
      .then((res) => setUser(res.data.user), setLoading(false))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    api()
      .get("/appointment/me/past")
      .then((res) =>
        formatAppoinments(res.data.appointments, setPastAppoinments)
      )
      .catch((err) => console.log(err));
  }, []);
  // Citas medicas proximas
  useEffect(() => {
    api()
      .get("/appointment/me/upcoming")
      .then((res) =>
        formatAppoinments(res.data.appointments, setUpcomingAppoinments)
      )
      .catch((err) => console.log(err));
  }, []);

  // Formateador de fechas de citas medicas
  function formatAppoinments(data, setMethod) {
    const formatData = data.map((esp) => {
      const date = new Date(esp.appointmentDate);
      const appointmentDate = date.toLocaleDateString();
      const startTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      // Sumamos hora inico + duracion cita
      date.setMinutes(date.getMinutes() + esp.duration);
      const endTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return {
        ...esp,
        appointmentDate,
        startTime,
        endTime,
      };
    });
    setMethod(formatData);
  }
  // Citas medicas pasadas

  return (
    <>
      {loading ? (
        "Cargando"
      ) : (
        <>
          <header className="header d-flex p-3 align-items-center justify-content-start gap-2">
            <img
              src="/images/Ellipse 53.png"
              className="img_perfil img-fluid rounded-circle"
              alt="perfil"
            />
            <div className="usuario-parrafo">
              <h5 className="usuario">Hola, {user.name?.toUpperCase()}.</h5>
              <p className="parrafo-foto">
                Aqui puedes ver tus turnos Medicos.
              </p>
            </div>
          </header>
          <main>
            <section className="p-3">
              <h3 className="turnos-activos">Turnos activos</h3>
              <p className="proximas">
                Estas son tus próximas citas confirmadas:
              </p>
              <div
                className="d-flex flex-row flex-nowrap"
                style={{ overflowX: "auto" }}
              >
                {upcomingAppointments.length != 0
                  ? upcomingAppointments.map((apt) => {
                      return (
                        <article
                          className="d-flex p-3 justify-content-between align-items-center gap-4 bg-body-tertiary shadow"
                          key={apt._id}
                          style={{
                            width: "278px",
                            minWidth: "278px",
                            margin: "0 10px",
                          }}
                        >
                          <img
                            src="/images/Profile_picture.png"
                            className="img_turno rounded"
                            alt="logoDoc"
                            style={{ maxWidth: "100%" }}
                          />
                          <div className="datos_turno">
                            <h4 className="turnos-activos">
                              Dr.{apt.doctor.name}
                            </h4>
                            <p className="proximas">
                              Área: {apt.specialty.name}
                            </p>
                            <p className="proximas">
                              Día: {apt.appointmentDate}
                            </p>
                            <p className="proximas">
                              Horario: {apt.startTime} - {apt.endTime}
                            </p>
                          </div>
                        </article>
                      );
                    })
                  : "Sin turnos pendientes"}
              </div>
            </section>
            <section className="p-3">
              <h3 className="turnos-activos">Turnos pasados</h3>
              {pastAppointments.length != 0
                ? pastAppointments.map((apt) => {
                    return (
                      <article
                        className="d-flex p-3 align-items-center justify-content-between gap-4 mb-3 bg-body-tertiary shadow "
                        key={apt._id}
                      >
                        <img
                          src="/images/Profile_picture.png"
                          className="img_turno rounded"
                          alt="logoDoc"
                        />
                        <div className="datos_turno">
                          <h4 className="turnos-activos">
                            Dr.{apt.doctor.name}
                          </h4>
                          <p className="proximas">Área: {apt.specialty.name}</p>
                          <p className="proximas">Día: {apt.appointmentDate}</p>
                          <p className="proximas">
                            Horario: {apt.startTime} - {apt.endTime}
                          </p>
                        </div>
                      </article>
                    );
                  })
                : "Sin turnos "}
            </section>
            <div className="d-flex px-3 pb-3">
              <Link
                to="/turnos-especialidad"
                className="btn color-boton col-12 col-md-6 mx-auto"
              >
                Crear nuevo turno
              </Link>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Seccion;
