module.exports.validateRegister = (username, password, confirmPassword) => {
  errors = {};
  if (username.trim() === "") {
    errors.username = "Musisz podać login";
  }
  if (password === "") {
    errors.password = "Musisz podać hasło";
  } else if (password.length < 6) {
    errors.password = "Hasło powinno mieć więcej niż 6 znaków";
  } else if (password !== confirmPassword) {
    errors.password = "Hasła muszą być takie same";
  }
  return {
    errors,
    valid: Object.keys(errors).length > 0,
  };
};
