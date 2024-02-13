// import PropTypes from 'prop-types';

import { Link, useParams, useNavigate } from "react-router-dom";
//import { getDoctorById } from './MockDoctors';
import { useState, useEffect } from "react";
import { api } from "../../utilities/axios";

function DoctorCard() {
  const { medId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [birthDay, setBirthDay] = useState("");
  const [days, setDays] = useState([]);

  function handleRemove() {
    api()
      .delete(`/doctor/${medId}`)
      .then(navigate("/admin"))
      .catch((e) => console.log(e));
  }

  function changeDayFormat(days) {
    let dias = [];
    days.forEach((day) => {
      switch (day) {
        case "Monday":
          dias.push(" Lunes");
          break;
        case "Tuesday":
          dias.push(" Martes");
          break;
        case "Wednesday":
          dias.push(" Miércoles");
          break;
        case "Thursday":
          dias.push(" Jueves");
          break;
        case "Friday":
          dias.push(" Viernes");
          break;
        case "Saturday":
          dias.push(" Sábado");
          break;
        case "Sunday":
          dias.push(" Domingo");
          break;
        default:
          break;
      }
    });
    setDays(dias);
  }

  useEffect(() => {
    try {
      api()
        .get(`/doctor/${medId}`)
        .then((res) => {
          setSpecialties(res.data.doctor.specialties);
          setDoctor(res.data.doctor);
          setBirthDay(res.data.doctor.birthDay.slice(0, 10));
          changeDayFormat(res.data.doctor.schedule.daysOfWeek);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }, [medId]);

  useEffect(() => {
    try {
      api()
        .get(`/doctor/${medId}`)
        .then((res) => {
          setSpecialties(res.data.doctor.specialties);
          setDoctor(res.data.doctor);
          setBirthDay(res.data.doctor.birthDay.slice(0, 10));
          changeDayFormat(res.data.doctor.schedule.daysOfWeek);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }, [medId]);

  return (
    <div className="card col p-2">
      {loading ? (
        <p>Cargando</p>
      ) : (
        <div>
          <div
            className="card-body border border-secondary rounded"
            style={{ color: "#0B2860" }}
          >
            <div className="container d-flex mb-4">
              <img
                className="card-img-top"
                style={{ height: "95px", width: "100px" }}
                src={
                  doctor.gender == "male"
                    ? "https://img.freepik.com/foto-gratis/doctor-brazos-cruzados-sobre-fondo-blanco_1368-5790.jpg?w=2000"
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VcNrlLvabf6_8efcKV4W_oNFJWuX8U9tbg&usqp=CAU"
                }
                alt="medico"
              />
              <div className="px-5">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">
                  DNI: <span className="fw-bold"> {doctor.personalId}</span>
                </p>
                <p className="card-text">
                  N. de matricula:
                  <span className="fw-bold"> {doctor.license}</span>
                </p>
              </div>
            </div>
            <hr />
            <h4>Datos personales</h4>
            <div className="container-fluid row my-4">
              <div className="col-6">
                <p className="card-text">Especialidad/es:</p>
                <p className="card-text">Fecha de nacimiento:</p>
                <p className="card-text">Nacionalidad:</p>
                <p className="card-text">Dirección:</p>
                <p className="card-text">Teléfono de contacto:</p>
                <p className="card-text">Email:</p>
              </div>
              <div className="col-6">
                {specialties.map((specialty, index) => (
                  <span className="card-text fw-bold" key={index}>
                    {specialty.name + " "}
                  </span>
                ))}
                <p className="card-text mt-4 fw-bold">{birthDay}</p>
                <p className="card-text mt-4 fw-bold">{doctor.nationality}</p>
                <p className="card-text mt-4 fw-bold">{doctor.address}</p>
                <p className="card-text mt-4 fw-bold">{doctor.phoneNumber}</p>
                <p className="card-text mt-4 fw-bold">{doctor.email}</p>
              </div>
            </div>
            <hr />
            <h4>Horarios</h4>
            <div className="container-fluid row mb-2">
              <div className="col">
                <p className="card-text">Turno:</p>
                <p className="card-text">Días laborales</p>
              </div>
              <div className="col">
                <p className="card-text fw-bold">
                  {doctor.schedule.startTime + " - " + doctor.schedule.endTime}
                </p>
                <span className="card-text d-flex fw-bold">{days + " "}</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleRemove}
              className="btn btn-outline-secondary mx-2 mb-3"
              style={{ color: "black", width: "260px" }}
            >
              Eliminar
            </button>
            {/*<Link to="/remove" className="btn btn-outline-secondary mx-2" style={{ color: 'black', width: '187px' }} href="#">Eliminar</Link>*/}
            <Link
              to={`/doctor/edit/${doctor._id}`}
              className="btn btn-secondary mb-3"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#00BFB2",
                width: "260px",
                border: "#00BFB2",
              }}
              href="#"
            >
              Editar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorCard;
