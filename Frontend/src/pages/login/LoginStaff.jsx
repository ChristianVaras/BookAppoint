import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authServices from "../../services/authServices";
//import validatePassword from "../../utilities/validatePassword";
import style from "./login.module.css";

const initialValues = {
  email: "",
  password: "",
};

const LoginStaff = () => {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const { auth } = authServices();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken"))
      localStorage.removeItem("accessToken");
  }, []);
  const validate = () => {
    let errorsList = {};

    if (!state.email)
      errorsList = { ...errorsList, email: "Campo obligatorio" };

    //const errorPass = validatePassword(state.password);
    //if (errorPass) errorsList = { ...errorsList, password: errorPass };

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
        email: state.email,
        password: state.password,
      };
      try {
        const { data } = await auth.loginStaff(body);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/admin");
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    setErrors(response);
  };

  return (
    <main className="mx-auto text-center w-75">
      <h1 className="pt-4">Inicio de Sesion</h1>
      <h4 className="mb-5">Ingresar a tu cuenta</h4>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 ">
        <div className="d-flex flex-column">
          <label htmlFor="personalId" className="fst-italic align-self-start">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="bg-light border border-none text-dark p-2 mb-3"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {errors.email && <p className={style.errorText}>{errors.email}</p>}
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="" className="fst-italic align-self-start">
            Contraseña
          </label>
          <input
            type="password"
            className="bg-light border border-none text-dark p-2"
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

        <Link
          to="/resetPassword"
          className="link-underline link-underline-opacity-0 fs-6 align-self-end mb-2"
        >
          Olvidé mi contraseña
        </Link>
        <button className="btn btn-success my-2 mx-auto w-50">Ingresar</button>
      </form>
    </main>
  );
};
export default LoginStaff;
