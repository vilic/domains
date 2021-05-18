const Path = require('path');

const fs = require('fs');

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

  if (domain === 'qmkx.com' || domain === 'ryzj.com' || domain === 'bysb.com') {
    res.render('quad-word-domain', data.data[domain]);
    return;
  }

  const domainPath = Path.join(__dirname, 'static', `${domain}.html`);
  fs.access(domainPath, fs.constants.F_OK, error => {
    if (error) {
      res.render('other-domain', {
        domain,
        keywords: '',
        title: domain,
      });
    } else {
      res.sendFile(domainPath);
    }
  });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
