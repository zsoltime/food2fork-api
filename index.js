const express = require('express');
const axios = require('axios');

const key = process.env.API_KEY;
const port = process.env.PORT || 3335;
const url = 'http://food2fork.com/api/search';
const app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.get('/', (req, res) => {
  const q = req.query.q || null;
  const sort = req.query.sort || 'r';
  const page = req.query.page || 1;

  axios.get(url, {
    params: { key, q, sort, page }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res.json({ err });
    });
});

app.listen(port, () => console.log('App is listening on port %s', port));
