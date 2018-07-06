const express = require('express');
const cors = require('cors');
let db;

if (process.env.DB === 'postgres') {
  db = require('../database/postgres');
} else if (process.env.DB === 'couch') {
  db = require('../database/couch');
} else if (process.env.DB === 'cassandra') {
  db = require('../database/cassandra');
}

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));

app.get('/product/:id/images', (req, res) => {
  db.getProduct(req.params.id, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send(err);
    }
  });
});

app.delete('/product/:id/images', (req, res) => {
  db.deleteProduct(req.params.id, (err) => {
    if (!err) {
      res.status(200).send();
    } else {
      res.status(500).send(err);
    }
  });
});

app.put('/product/:id/images', (req, res) => {
  db.updateProduct(req.body, (err) => {
    if (!err) {
      res.status(200).send();
    } else {
      res.status(500).send(err);
    }
  });
});

app.post('/product/images', (req, res) => {
  db.createProduct(req.body, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send(err);
    }
  });
});

app.listen(3004);
