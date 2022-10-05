const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const fetchData = require('./fetchData');
const newToken = require('./token');
const { validateEmail, validatePassword } = require('./emailAndPasswordValidation');
const { validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  getLastId,
  insertNewTalker } = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/search', validateToken, async (req, res) => {
  const newQuery = req.query;
  // console.log(newQuery);

  const data = await fetchData();
  const parseData = JSON.parse(data);

  if (!newQuery) {
    return res.status(HTTP_OK_STATUS).json(parseData);
  }

  const foundTalkers = parseData.filter((element) => element.name.includes(newQuery.q));

  if (foundTalkers.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(200).json(foundTalkers);
});

app.get('/talker', async (_req, res) => {
  const data = await fetchData();
  
  return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
});

app.get('/talker/:id', async (req, res) => {
  const data = await fetchData();
  const parseData = JSON.parse(data);
  
  const { id } = req.params;
  const talker = parseData.find((element) => element.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);  
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = newToken();
  
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
validateToken, 
validateName, 
validateAge, 
validateTalk, 
validateWatchedAt,
validateRate,
async (req, res) => {
  const newTalker = req.body;
  const id = await getLastId() + 1;

  const newTalkerRegistry = {
    id,
    ...newTalker,
  };
  await insertNewTalker(newTalkerRegistry);
  return res.status(201).json(newTalkerRegistry);
});

app.put('/talker/:id', 
validateToken, 
validateName, 
validateAge, 
validateTalk, 
validateWatchedAt, 
validateRate, 
async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const data = await fetchData();
  const parseData = JSON.parse(data);
  // console.log(parseData);
  const editTalker = req.body;
  // console.log(editTalker);
  
  const index = parseData.findIndex((element) => element.id === Number(id));
  // console.log(index);

  const editTalkerRegistry = { 
    ...editTalker, 
    id: parseData[index].id,
   };
  
  await insertNewTalker(editTalkerRegistry);
  return res.status(200).json(editTalkerRegistry);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const data = await fetchData();
  const parseData = JSON.parse(data);
  console.log(parseData);

  // const person = parseData.find((element) => element.id === Number(id));

  const index = parseData.findIndex((element) => element.id === Number(id));
  parseData.splice(index, 1);

  await fs.writeFile('./src/talker.json', JSON.stringify(parseData));
  return res.status(204).json({ message: 'oi' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
