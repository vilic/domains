const Path = require('path');

const express = require('express');

const app = express();
const port = 80;

app.use(express.static('static'));

app.get('/', (req, res) => {
  let domain = req.hostname;

  domain = domain.replace(/^www\./, '');

  res.sendFile(Path.join(__dirname, 'static', `${domain}.html`));
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
