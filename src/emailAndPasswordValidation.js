const validateEmail = (email) => {
  const emailRegex = /[A-z0-9._]+@[a-z]+\.[a-z]{2,3}/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const minLength = 6;
  return password.length >= minLength;
};

// console.log(validateEmail('juca@trybe.com'));

module.exports = {
  validateEmail,
  validatePassword,
};