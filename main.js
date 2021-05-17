const Path = require('path');

const express = require('express');

const expressHandlebars = require('express-handlebars');

const data = require('./data');

const app = express();
const port = 80;

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.use(express.static('static'));

app.get('/', (req, res) => {
  let domain = req.hostname;

  domain = domain.replace(/^www\./, '');

  if (domain === 'qmkx.com') {
    res.render('quad-word-domain', data.data[domain]);
    return;
  }

  res.sendFile(Path.join(__dirname, 'static', `${domain}.html`));
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
