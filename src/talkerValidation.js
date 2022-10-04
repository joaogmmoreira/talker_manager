const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const minLength = 16;
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== minLength) {
    res.status(401).json({ message: 'Token inválido' });
  }  
  next();
};

const validateName = (req, res, next) => {
  const minLength = 3;
  const newTalker = req.body;
  if (!newTalker.name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (newTalker.name.length <= minLength) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();  
};

const validateAge = (req, res, next) => {
  const minAge = 18;
  const newTalker = req.body;
  if (!newTalker.age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (newTalker.age < minAge) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

// const validateTalkProperties = () => {

// }

// const validateTalk = (req, res, next) => {
//   const newTalker = req.body;
//   const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
//   if (!newTalker.talk) {
//     res.status(400).json({ message: 'O campo "talk" é obrigatório' });
//   }
//   if (!newTalker.talk.watchedAt) {
//     res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
//   }
//   if (!dateRegex.test(newTalker.talk.watchedAt)) {
//     res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }
//   if (!newTalker.talk.rate) {
//     res.status(400).json({ message: 'O campo "rate" é obrigatório' });
//   }
//   next();
// };

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
};