const fs = require('fs').promises;

const fetchData = async () => {
  try {
    const data = await fs.readFile('/app/src/talker.json');
    if (!data) {
      return [];
    }
    return data;
  } catch (error) {
    console.error('Não existe arquivo');
  }
};

module.exports = fetchData;