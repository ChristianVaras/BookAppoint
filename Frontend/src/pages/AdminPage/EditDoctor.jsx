import React, { useState, useEffect } from "react";
import style from "../register/register.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorById } from "./MockDoctors";
import { api } from "../../utilities/axios";

// const defaultValues = {
//   personalId: "",
//   name: "",
//   lastName: "",
//   matricula: "",
//   especialidad: "",
//   email: "",
//   phoneNumber: "",
//   birthDay: "",
//   gender: "",
//   address: "",
//   nationality: "",
//   cp: "",
//   turno: ["Maniana", "tarde"],
//   days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
// };

function EditDoctor() {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [days, setDays] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [turno, setTurno] = useState("");

  const { medId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api()
      .get("/doctor/" + medId)
      .then((res) => {
        if (res.data.ok) {
          setState(res.data.doctor);
          setSchedule(res.data.doctor.schedule);
          setDays(res.data.doctor.schedule.daysOfWeek);
          setTurno(
            res.data.doctor.schedule.startTime == "8:00" ||
              res.data.doctor.schedule.endTime == "12:00"
              ? "mañana"
              : "tarde"
          );
        }
        console.log(res.data.doctor);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    api()
      .get("/specialty")
      .then((res) => {
        setSpecialties(res.data.specialties);
      })
      .catch((err) => console.log(err));
  }, [medId]);
  const SepararStartEnd = (e) => {
    if (e.target.value == "mañana") {
      setTurno("mañana");
      setSchedule({ ...schedule, startTime: "8:00", endTime: "12:00" });
    } else {
      setTurno("tarde");
      setSchedule({ ...schedule, startTime: "14:00", endTime: "18:00" });
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    schedule.daysOfWeek = days;
    const selectedSpecialty =
      state.specialties.length > 0
        ? [state.specialties]
        : [state.specialties._id];
    setState({ ...state, specialties: selectedSpecialty });

    const body = {
      ...state,
      schedule,
    };
    console.log(body);
    api()
      .put("/doctor/" + medId, body)
      .then((res) =>
        !res.data.ok
          ? console.log("Error al editar un Doctor")
          : navigate("/doctor/" + medId)
      )
      .catch((error) => {
        console.log(error);
      });
    setErrors({});
  };
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
  return (
    <>
      {loading ? (
        "Cargando"
      ) : (
        <main className="container mx-auto p-4">
          <h1>Editar doctor</h1>
          <p className="mb-5">
            Forem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <h4>Datos personales</h4>
          <form
            action=""
            onSubmit={handleSubmit}
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
                name="personalId"
                value={state.license}
                onChange={handleChange}
              />
              {errors.matricula && (
                <p className={style.errorText}>{errors.matricula}</p>
              )}
            </div>

            <div>
              <label htmlFor="" className="fst-italic align-self-start">
                Especialidad
              </label>
              <select
                className="form-select bg-light border border-none text-dark p-2"
                name="specialties"
                value={state.specialties[0]._id}
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
                  value={new Date(state.birthDay).toISOString().split("T")[0]}
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
              {errors.email && (
                <p className={style.errorText}>{errors.email}</p>
              )}
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
                value={turno}
              >
                <option value="" hidden>
                  Seleccionar turno
                </option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
              </select>
              {errors.turno && (
                <p className={style.errorText}>{errors.turno}</p>
              )}
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
      )}
    </>
  );
}

export default EditDoctor;
