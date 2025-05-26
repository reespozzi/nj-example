const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/', (req, res) => {
  res.render('index.njk', { title: 'Peach' });
});

router.post('/ping-google', (req, res) => {
  https.get('https://www.google.com', (response) => {
      res.render('index.njk', {
      title: 'Ping Google',
      status: response.statusCode
      });
  }).on('error', (err) => {
      res.render('index.njk', {
      title: 'Ping Google',
      status: `Error: ${err.message}`
      });
  });
});

module.exports = router;