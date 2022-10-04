const validateToken = (token) => {
  const minLength = 16;
  return token.length === minLength;
};

const validateName = (name) => {
  const minLength = 3;
  return name.length >= minLength;
};

module.exports = {
  validateToken,
  validateName,
};