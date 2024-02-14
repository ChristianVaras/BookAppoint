import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { getMedicos } from '../MockMedicos/MockMedicos';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Select from "react-select";
//import ConfirmarTurnos from '../ConfirmarCita/ConfirmarCita';
import { api } from "../../../utilities/axios";
import Calendario from "../Calendario/Calendario";

function FechaTurno() {
  const { medId } = useParams();
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api()
      .get(`/doctor/${medId}/calendar`)
      .then((response) => {
        setAgenda(response.data.calendar);
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, [medId]);

  return (
    <div>
      {loading ? "Cargando" : <Calendario agenda={agenda} medId={medId} />}
    </div>
  );
}

export default FechaTurno;
