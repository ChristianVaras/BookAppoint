import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import validatePassword from "../../utilities/validatePassword";
import style from "./register.module.css";

const initialValues = {
  personalId: "",
  password: "",
  password2: "",
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDay: "",
  gender: "",
  address: "",
  nationality: "",
  cp: "",
  conditions: false,
  robot: false,
};

const Register = () => {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { auth } = authServices();

  const validate = () => {
    let errorsList = {};
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!state.email)
      errorsList = { ...errorsList, email: "Campo obligatorio" };
    else if (!emailRegExp.test(state.email))
      errorsList = {
        ...errorsList,
        email: "Debe ingresar una direccion de correo valida",
      };
    if (!state.name) errorsList = { ...errorsList, name: "Campo obligatorio" };
    if (!state.lastName)
      errorsList = { ...errorsList, lastName: "Campo obligatorio" };
    if (!state.personalId)
      errorsList = { ...errorsList, personalId: "Campo obligatorio" };
    else if (state.personalId.length < 8)
      errorsList = {
        ...errorsList,
        personalId: "Debe tener al menos 8 digitos",
      };
    if (!state.birthDay)
      errorsList = { ...errorsList, birthDay: "Campo obligatorio" };
    if (!state.nationality)
      errorsList = { ...errorsList, nationality: "Campo obligatorio" };
    if (!state.gender)
      errorsList = { ...errorsList, gender: "Campo obligatorio" };
    if (!state.phoneNumber)
      errorsList = { ...errorsList, phoneNumber: "Campo obligatorio" };
    if (!state.address)
      errorsList = { ...errorsList, address: "Campo obligatorio" };
    if (!state.cp) errorsList = { ...errorsList, cp: "Campo obligatorio" };

    const errorPass1 = validatePassword(state.password);
    const errorPass2 = validatePassword(state.password2);

    if (errorPass1) errorsList = { ...errorsList, password: errorPass1 };
    if (errorPass2) errorsList = { ...errorsList, password2: errorPass2 };
    if (!errorPass1 & !errorPass2 && state.password !== state.password2)
      errorsList = {
        ...errorsList,
        password: ["Los passwords deben coincidir"],
        password2: ["Los passwords deben coincidir"],
      };

    if (!state.conditions)
      errorsList = {
        ...errorsList,
        conditions: "Debe aceptar los terminos y condiciones",
      };
    if (!state.robot)
      errorsList = { ...errorsList, robot: "Aceptar que no es un robot" };
    return errorsList;
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const response = validate();
    if (Object.keys(response).length < 1) {
      const body = {
        name: `${state.name} ${state.lastName}`,
        password: state.password,
        personalId: state.personalId,
        email: state.email,
        phoneNumber: state.phoneNumber,
        address: state.address,
        birthDay: Date.parse(state.birthDay),
        gender: state.gender,
        nationality: state.nationality,
        cp: state.cp,
      };
      try {
        const { data } = await auth.signup(body);
        console.log(data.message);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
    setErrors(response);
  };

  return (
    <main className="mx-auto text-center w-75">
      <h1 className="pt-4">Registrar Cuenta</h1>
      <h4 className="mb-5">Registrar nueva cuenta.</h4>
      <form
        className="d-flex flex-column gap-2 align-self-start text-start"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Nombre/s
          </label>
          <input
            type="text"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Nombre/s"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          {errors.name && <p className={style.errorText}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Apellido/s
          </label>
          <input
            type="text"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Apellido/s"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className={style.errorText}>{errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Documento de identidad
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

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Contraseña"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div>
              {errors.password.map((elem, index) => (
                <p key={index} className={style.errorText}>
                  {elem}
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="" className="fst-italic align-self-start">
            Repetir contraseña
          </label>
          <input
            type="password"
            className="form-control bg-light border border-none text-dark p-2"
            placeholder="Repetir contraseña"
            name="password2"
            value={state.password2}
            onChange={handleChange}
          />
          {errors.password2 && (
            <div>
              {errors.password2.map((elem, index) => (
                <p key={index} className={style.errorText}>
                  {elem}
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label style={{ marginTop: "15px" }} className="bg-white">
            <input
              type="checkbox"
              className="form-check-input"
              name="conditions"
              value={state.conditions}
              onChange={handleChange}
            />
            Acepto los términos y condiciones
          </label>
          {errors.conditions && (
            <p className={style.errorText}>{errors.conditions}</p>
          )}
        </div>

        {/* <label className="bg-white">
          <input type="checkbox" className="form-check-input" />
          Acepto recibir notificaciones vía mail (opcional)
        </label> */}

        <div className="border p-3 d-flex align-items-center">
          <label className="m-0">
            <input
              type="checkbox"
              className="form-check-input"
              name="robot"
              value={state.robot}
              onChange={handleChange}
            />
            No soy un robot
          </label>
          {errors.robot && <p className={style.errorText}>{errors.robot}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3 bg-success w-50 mx-auto border-0"
          style={{
            transition: "background-color 0.2s",
            backgroundColor: "#000",
          }}
        >
          Registrarse
        </button>
      </form>
    </main>
  );
};

export default Register;
