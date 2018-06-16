const express = require('express');
const models = require('./models');
const cors = require('cors');

const { Image, Product } = models;
const app = express();
app.use(cors());
// Absolute is preffered
// app.use(express.static('./public'));
app.use('/:id', express.static('./public'));
app.get('/images/:id', (req, res) => {
  const { id } = req.params;
  const result = [];
  Product.find({ _id: id }, (err, data) => {
    if (err) throw new Error(err);
    result.push(data[0]);
  })
    .then(() => {
      Image.find({ _id: id }, (err, data) => {
        if (err) throw new Error(err);
        result.push(data[0]);
      })
        .then(() => {
          res.end(JSON.stringify(result));
        });
    });
});
app.listen(3004);
