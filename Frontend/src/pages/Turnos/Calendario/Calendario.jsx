import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendario.css";
import ConfirmarTurnos from "../ConfirmarCita/ConfirmarCita";
import { api } from "../../../utilities/axios";
import { useCartContext } from "../Contexto/Contexto";

const Calendario = ({ agenda, medId }) => {
  const { especialidad } = useCartContext();

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [userId, setUserId] = useState("");

  const [medicoName, setMedicoName] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [appointment, setAppointment] = useState(null);
  const minDate = new Date(
    fechaSeleccionada.getFullYear(),
    fechaSeleccionada.getMonth(),
    1
  );
  const maxDate = new Date(
    fechaSeleccionada.getFullYear(),
    fechaSeleccionada.getMonth() + 1,
    0
  );

  const diasDisponiblesEnAgenda = agenda
    .filter((day) => day.availableAppointmentSlots !== 0)
    .map((day) => day.day);

  const diaNoDisponibleEnAgenda = agenda
    .filter((day) => day.availableAppointmentSlots === 0)
    .map((day) => day.day);

  useEffect(() => {
    setAppointment(null);
    api()
      .get("/auth/me")
      .then((response) => {
        setUserId(response.data.user._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (appointment) {
      console.log(appointment);

      setLoading2(loading);
    }
  }, [appointment, loading]);

  const crearCita = (date) => {
    if (userId) {
      const data = {
        doctor: medId,
        patient: userId,
        appointmentDate: date,
        specialty: especialidad,
      };
      api()
        .post("/appointment", data)
        .then((response) => {
          console.log(response.data.appointment);
          setAppointment(response.data.appointment);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleFechaChange = (date) => {
    setFechaSeleccionada(date);
    console.log(fechaSeleccionada);
  };

  const agregarClaseCSS = ({ date, view }) => {
    if (view === "month") {
      const month = date.getMonth();
      const diaActual = date.getDate();

      if (diasDisponiblesEnAgenda.includes(diaActual)) {
        return "availableDays";
      }
      if (
        month === new Date().getMonth() &&
        diaNoDisponibleEnAgenda.includes(diaActual)
      ) {
        return "unAvailableDays";
      }
    }
  };

  const deshabilitarDias = ({ date, view }) => {
    const diaActual = date.getDate();
    return view === "month" && !diasDisponiblesEnAgenda.includes(diaActual);
  };

  return (
    <div className="almanaque">
      {loading ? (
        <div className="calendario">
          <div className="numero-titulo">
            <p className="numero">2</p>
            <h2 className="titulo">Seleccionar Fecha</h2>
            <p className="parrafo">Luego deberas indicar el dia de tu asistencia y el sistema te asignara el horario.</p>
          </div>

          <Calendar
            value={fechaSeleccionada}
            onChange={handleFechaChange}
            tileClassName={agregarClaseCSS}
            tileDisabled={deshabilitarDias}
            minDate={minDate}
            maxDate={maxDate}
            onClickDay={crearCita}
          />


        </div>

      ) : (
        ""
      )}
      {appointment && !loading && <ConfirmarTurnos appointment={appointment} />}
    </div>
  );
};

export default Calendario;
