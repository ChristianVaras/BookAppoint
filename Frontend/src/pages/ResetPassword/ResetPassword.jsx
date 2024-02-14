import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./resetPassword.module.css";
import authServices from "../../services/authServices";

const { auth } = authServices(); // creamos una instancia de autenticación

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Introduce una dirección de correo electrónico válida")
    .required("Campo obligatorio"),
});

function ResetPassword() {
  const [buttonText, setButtonText] = useState("Enviar");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setButtonText("Enviando..."); // establecer el texto del botón a "Enviando"
      const { data } = await auth.forgotPassword(values);
      if (data.ok) {
        console.log(data.message);
        setEmailError("");
        setSubmitting(false);
        setButtonText("Reenviar"); // establecer el texto del botón a "Reenviar"
      } else {
        setEmailError("No existe una cuenta con ese email");
        setButtonText("Enviar"); // establecer el texto del botón a "Enviar"
      }
    } catch (err) {
      console.log(err);
      setButtonText("Enviar"); // establecer el texto del botón a "Enviar"
    }
  };

  return (
    <main className="mx-auto d-flex justify-content-center text-center w-75">
      <div className={`d-flex flex-column p-3 ${styles.container}`}>
        <h1 className="pt-4">Recuperar tu contraseña</h1>
        <p>Ingrese su correo registrado para generar una nueva contraseña</p>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting }) => (
            <Form className={styles.form}>
              <div className="mb-3">
                <Field
                  type="email"
                  className={`form-control ${
                    errors.email && styles.inputError
                  }`}
                  id="email"
                  name="email"
                  placeholder="nombre@gmail.com"
                />
                {errors.email ? (
                  <p className={styles.textError}>{errors.email}</p>
                ) : emailError ? (
                  <p className={styles.textError}>{emailError}</p>
                ) : null}
              </div>

              <button
                type="submit"
                className={`btn w-100 text-white  ${styles.button}`}
                disabled={isSubmitting}
              >
                {buttonText}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default ResetPassword;
