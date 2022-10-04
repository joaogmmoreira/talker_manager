const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
const fetchData = require('./fetchData');

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
