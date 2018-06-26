const express = require('express');
const cors = require('cors');
const queryPG = require('../database/postgres');

const app = express();
app.use(cors());

app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));

app.get('/product/:id/images', (req, res) => {
  queryPG.getProduct(req.params.id, (results) => {
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
