const express = require('express');
const bodyParser = require('body-parser');
const fetchData = require('./fetchData');
const newToken = require('./token');
const { validateEmail, validatePassword } = require('./emailAndPasswordValidation');
const { validateToken,
  validateName,
  validateAge,
  validateTalk } = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const data = await fetchData();
  // console.log(JSON.parse(data));
  
  return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
});

app.get('/talker/:id', async (req, res) => {
  const data = await fetchData();
  const parseData = JSON.parse(data);
  // console.log(parseData);
  const { id } = req.params;
  const talker = parseData.find((element) => element.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);  
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // console.log(validatePassword(password));
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
  // console.log(token);
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  const newTalker = req.body;

  return res.status(201).json(newTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
