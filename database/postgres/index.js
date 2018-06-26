const { Client } = require('pg');

const client = new Client({
  database: 'product_info_and_images',
});
client.connect();

const getProduct = (productId, callback) => {
  const sql = `
  SELECT 
    p.id,
    p.gender,
    p.category,
    p.type,
    pij.position_index,
    i.url
  FROM products p

  JOIN product_image_join pij
  ON p.id = pij.product_id

  JOIN images i
  ON pij.image_id = i.id

  where p.id=${productId}
  `;

  client.query(sql, (err, res) => {
    if (err) {
      console.log('ERROR QUERYING DB', err);
    } else {
      callback(res);
    }
  });
};

module.exports = {
  getProduct,
};
