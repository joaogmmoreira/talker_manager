// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

const random = () => Math.random().toString(36).substring(2);
// console.log(random());

const token = () => {
  const bigToken = random() + random();
  return bigToken.substring(0, 16);
};
// console.log(token());

module.exports = token;