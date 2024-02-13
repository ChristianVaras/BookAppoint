import React, { useState, useEffect } from "react";
import style from "../register/register.module.css";
import { api } from "../../utilities/axios";
import { useNavigate } from "react-router-dom";

// const defaultValues = {
//   personalId: "",
//   name: "",
//   license: "",
//   especialidad: "",
//   email: "",
//   phoneNumber: "",
//   birthDay: "",
//   gender: "",
//   address: "",
//   nationality: "",
//   cp: "",
//   turno: ["Mañana", "tarde"],
//   days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
// };

function RegisterDoctor() {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    api()
      .get("/specialty")
      .then((res) => {
        setSpecialties(res.data.specialties);
        console.log(res.data.specialties);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleOnCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDays((prevSelectedDays) => [...prevSelectedDays, value]);
    } else {
      setDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    }
  };

  const SepararStartEnd = (e) => {
    if (e.target.value == "mañana") {
      setStartTime("8:00"), setEndTime("12:00");
    } else {
      setStartTime("14:00"), setEndTime("18:00");
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const crearDoctor = (e) => {
    e.preventDefault();
    state.daysOfWeek = [...days];
    state.startTime = startTime;
    state.appointmentDuration = 60;
    state.endTime = endTime;
    state.specialties = [state.specialties];
    let body = state;
    console.log(body);

    api()
      .post("/doctor", body)
      .then((res) =>
        !res.data.ok
          ? console.log("Error al registrar un Doctor")
          : navigate("/admin")
      )
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(()=>{
  //   api()
  //   .get("/specialty")
  //   .then(res=>res.dataoptions={especialidades.map((esp) => ({
  //     label: esp.name,
  //     value: esp._id,
  //   }))})
  // },[])

  return (
    <main className="container mx-auto p-4">
      <h1>Agregar perfil profesional</h1>
      <p className="mb-5">
        Forem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <h4>Datos personales</h4>
      <form
        action=""
        onSubmit={crearDoctor}
        className="d-flex flex-column gap-2 align-self-start text-start"
      >
        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Nombre y Apellido
          </label>
          <input
            type="text"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Nombre y Apellido"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          {errors.name && <p className={style.errorText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            DNI
          </label>
          <input
            type="text"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Documento de identidad"
            name="personalId"
            value={state.personalId}
            onChange={handleChange}
          />
          {errors.personalId && (
            <p className={style.errorText}>{errors.personalId}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            N. de matrícula
          </label>
          <input
            type="text"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Número de matrícula"
            name="license"
            value={state.license}
            onChange={handleChange}
          />
          {errors.license && (
            <p className={style.errorText}>{errors.license}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Especialidad
          </label>
          <select
            className="form-select bg-light border border-none text-dark p-2"
            name="specialties"
            value={state.specialties}
            onChange={handleChange}
          >
            <option value="" selected disabled>
              Seleccionar especialidad
            </option>

            {specialties.map((esp) => (
              <option value={esp._id} key={esp._id}>
                {esp.name}
              </option>
            ))}
          </select>
          {errors.especialidad && (
            <p className={style.errorText}>{errors.especialidad}</p>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="form-control bg-light border border-none text-dark p-2"
              placeholder="Fecha de Nacimiento"
              name="birthDay"
              value={state.birthDay}
              onChange={handleChange}
            />
            {errors.birthday && (
              <p className={style.errorText}>{errors.birthday}</p>
            )}
          </div>

          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              Nacionalidad
            </label>
            <input
              type="text"
              className="form-control bg-light border border-none text-dark p-2"
              placeholder="Nacionalidad"
              name="nationality"
              value={state.nationality}
              onChange={handleChange}
            />
            {errors.nationality && (
              <p className={style.errorText}>{errors.nationality}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              Sexo
            </label>
            <select
              className="form-select bg-light border border-none text-dark p-2"
              name="gender"
              value={state.gender}
              onChange={handleChange}
            >
              <option value="">Seleccionar sexo</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
            {errors.gender && (
              <p className={style.errorText}>{errors.gender}</p>
            )}
          </div>

          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              Número de teléfono
            </label>
            <input
              type="tel"
              className="form-control bg-light border border-none text-dark p-2"
              placeholder="Número de teléfono"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <p className={style.errorText}>{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              Dirección
            </label>
            <input
              type="text"
              className="form-control bg-light border border-none text-dark p-2"
              placeholder="Dirección"
              name="address"
              value={state.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className={style.errorText}>{errors.address}</p>
            )}
          </div>

          <div className="col-md-6 col-6">
            <label htmlFor="" className="fst-italic align-self-start">
              CP
            </label>
            <input
              type="text"
              className="form-control bg-light border border-none text-dark p-2"
              placeholder="CP"
              name="cp"
              value={state.cp}
              onChange={handleChange}
            />
            {errors.cp && <p className={style.errorText}>{errors.cp}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Email
          </label>
          <input
            type="email"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {errors.email && <p className={style.errorText}>{errors.email}</p>}
        </div>

        <h4>Horarios</h4>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Turno
          </label>
          <select
            className="form-select bg-light border border-none text-dark p-2"
            name="startTime"
            onChange={SepararStartEnd}
          >
            <option value="" hidden>
              Seleccionar turno
            </option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
          {errors.turno && <p className={style.errorText}>{errors.turno}</p>}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Días disponibles
          </label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="lunes"
            name="lunes"
            value="Monday"
            checked={days.includes("Monday")}
          />
          <label htmlFor="lunes"> Lunes</label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="martes"
            name="martes"
            value="Tuesday"
            checked={days.includes("Tuesday")}
          />
          <label htmlFor="martes"> Martes</label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="miercoles"
            name="miercoles"
            value="Wednesday"
            checked={days.includes("Wednesday")}
          />
          <label htmlFor="miercoles"> Miércoles</label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="jueves"
            name="jueves"
            value="Thursday"
            checked={days.includes("Thursday")}
          />
          <label htmlFor="Jueves"> Jueves</label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="viernes"
            name="viernes"
            value="Friday"
            checked={days.includes("Friday")}
          />
          <label htmlFor="viernes"> Viernes</label>
          <br />
          <input
            type="checkbox"
            onChange={handleOnCheckbox}
            id="sabado"
            name="sabado"
            value="Saturday"
            checked={days.includes("Saturday")}
          />
          <label htmlFor="sabado"> Sábado</label>
          <br />
          {errors.days && <p className={style.errorText}>{errors.days}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3 bg-dark w-50 mx-auto border-0"
          style={{
            transition: "background-color 0.2s",
            backgroundColor: "#000",
          }}
        >
          Guardar
        </button>
      </form>
    </main>
  );
}

export default RegisterDoctor;
