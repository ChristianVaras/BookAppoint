import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./TurnoEspecialidad.css";
import { api } from "../../../utilities/axios";
import { useCartContext } from "../Contexto/Contexto";
import ModalMedicos from "../MostrarMedicos/MostrarMedicos";
import MensajeAnteriorEspecialidad from "../../MensajeAnteriorEspecialidad/MensajeAnteriorEspecialidad";
import ManejarModales from "../ManejarModales/ManejarModales";
//import MensajeAnteriorEspecialidad from "../../MensajeAnteriorEspecialidad/MensajeAnteriorEspecialidad";

const TurnoEspecialidad = () => {
  const { recolectarDatos } = useCartContext();
  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [medicosEspecialidad, setMedicosEspecialidad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    api()
      .get("/specialty")
      .then((response) => {
        setEspecialidades(response.data.specialties);
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectMedicos = ({ value }) => {
    setIdEspecialidad(value);
    console.log("set id especialidad" + value);
    api()
      .get("/doctor/specialty/" + value)
      .then((response) => {
        setMedicosEspecialidad(response.data.doctors);
      })
      .finally(() => setLoading2(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="numero-titulo">
        <p className="numero">1</p>
        <h2 className="titulo">Elegir Especialidad.</h2>
        <p className="parrafo">El primer paso es seleccionar el medico de tu preferencia.</p>
      </div>

      {loading ? (
        "Cargando"
      ) : (
        <Select
          className="select"
          placeholder="Selecciona Especialidad"
          name="especialidades"
          options={especialidades.map((esp) => ({
            label: esp.name,
            value: esp._id,
          }))}
          onChange={selectMedicos}
          key={especialidades.map((esp) => esp._id)}
        />
      )}
      <div className="orden-modales">
        {loading2  
        ? <MensajeAnteriorEspecialidad/>      
          // ? <div className="area-imagen"><img src="/images/77192-search-doctor.jpg" alt="imagen-de-lupa" className="imagen-lupa"/></div>
          : medicosEspecialidad.map((med) => (
            <div key={med._id}>
              {<ModalMedicos med={med} idEspecialidad={idEspecialidad} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TurnoEspecialidad;
