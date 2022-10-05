const fs = require('fs').promises;
const fetchData = require('./fetchData');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const minLength = 16;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== minLength) {
    return res.status(401).json({ message: 'Token inválido' });
  }  
  next();
};

const validateName = (req, res, next) => {
  const minLength = 3;
  const newTalker = req.body;
  if (!newTalker.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (newTalker.name.length <= minLength) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();  
};

const validateAge = (req, res, next) => {
  const minAge = 18;
  const newTalker = req.body;

  const ageIsInteger = Number.isInteger(newTalker.age);

  if (!newTalker.age || !ageIsInteger) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (newTalker.age < minAge) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const talkProperties = ['name', 'age', 'talk'];
  const newTalker = req.body;

  const validateProperties = talkProperties.every((element) => element in newTalker);
  
  if (!validateProperties) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!newTalker.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const newTalker = req.body;
  const dateRegex = /\d{2}\/\d{2}\/\d{4}$/;
  
  if (!newTalker.talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(newTalker.talk.watchedAt)) {
    // console.log('Aqui');
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const newTalkerRate = req.body.talk.rate;
  
  const rateIsInteger = Number.isInteger(newTalkerRate);

  if ((newTalkerRate < 1) || (newTalkerRate > 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!newTalkerRate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!rateIsInteger) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const getLastId = async () => {
  const data = await fetchData();
  const parseData = JSON.parse(data);
  const lastPosition = parseData.length - 1;
  const lastPositionId = parseData[lastPosition].id;
  return lastPositionId;
};

const insertNewTalker = async (newTalker) => {
  const data = await fetchData();
  const parseData = JSON.parse(data);

  parseData.push(newTalker);

  return fs.writeFile('./src/talker.json', JSON.stringify(parseData));
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  getLastId,
  insertNewTalker,
};