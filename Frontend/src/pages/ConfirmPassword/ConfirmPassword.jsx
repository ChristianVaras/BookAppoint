import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import validatePassword from "../../utilities/validatePassword";
import authServices from "../../services/authServices";
import style from "./confirmPassword.module.css";

const initialValues = { password: "", password2: "" };
function ConfirmPassword() {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { auth } = authServices();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get("token"));
  }, [location.search]);

  const validate = () => {
    let errorsList = {};

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

    return errorsList;
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const errorValidate = validate();
    if (Object.keys(errorValidate).length < 1) {
      const body = {
        token,
        password: state.password,
      };
      try {
        const { data } = await auth.resetPassword(body);
        console.log(data.message);
        if (data.ok) {
          navigate("/login");
        } else {
          setErrors({ token: data.message });
        }
        console.log(data.message);
      } catch (err) {
        console.log(err);
      }
    }
    setErrors(errorValidate);
  };

  return (
    <section className="container">
      <h4 className="my-5 mb-5">Crear nueva contraseña</h4>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <label htmlFor="" className="fst-italic align-self-start">
          Elige tu nueva contraseña
        </label>
        <input
          type="password"
          name="password"
          className="bg-light border border-none rounded text-dark p-2 mb-3"
          placeholder="Escribe tu contraseña"
          required
          value={state.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className={style.errorText}>{errors.password}</p>
        )}
        <label htmlFor="" className="fst-italic align-self-start">
          Repite tu nueva contraseña
        </label>
        <input
          type="password"
          name="password2"
          className="bg-light border border-none rounded text-dark p-2"
          value={state.password2}
          placeholder="Escribe nuevamente tu contraseña"
          onChange={handleChange}
          required
        />
        {errors.password2 && (
          <p className={style.errorText}>{errors.password2}</p>
        )}
        {errors.token && <p className={style.errorText}>{errors.token}</p>}
        <button className="btn btn-primary my-5 mb-1">Guardar</button>
        <Link to="/login" className="btn btn-outline-primary" href="#">
          Cancelar
        </Link>
      </form>
    </section>
  );
}

export default ConfirmPassword;
