const validatePassword = (password) => {
  const passRegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{};':",.<>/?])(.{8,})$/;
  let error = null;
  if (!password) error = ["Campo obligatorio"];
  else if (!passRegExp.test(password))
    error = ["La contraseña debe tener", "al menos 8 caracteres", "al menos 1 letra mayuscula", "al menos 1 caracter especial"];

  return error;
};

export default validatePassword;
