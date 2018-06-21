const express = require('express');
// const models = require('./models');
const cors = require('cors');
const query = require('../database/postgres');

// const { Image, Product } = models;
const app = express();
app.use(cors());
// Absolute is preffered
app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));
// app.get('/products/:id/images', (req, res) => {
//   const { id } = req.params;
//   const result = [];
//   Product.find({ _id: id }, (err, data) => {
//     if (err) throw new Error(err);
//     result.push(data[0]);
//   })
//     .then(() => {
//       Image.find({ _id: id }, (err, data) => {
//         if (err) throw new Error(err);
//         result.push(data[0]);
//       })
//         .then(() => {
//           res.end(JSON.stringify(result));
//         });
//     });
// });

app.get('/product/:id/images', (req, res) => {
  query.getProduct(req.params.id, (results) => {
    // console.log('RES FROM GET:', results.rows);
    const firstRow = results.rows[0];
    const details = [firstRow.gender, firstRow.category, firstRow.type];
    const images = results.rows.map(entry => entry.url);
    const packet = {
      details,
      images,
    };
    res.send(packet);
  });
});

app.listen(3004);
