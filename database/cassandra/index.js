const cassandra = require('cassandra-driver');

let client;

const connect = (contactPoint) => {
  client = new cassandra.Client({
    contactPoints: [contactPoint],
    keyspace: 'products_images',
  });
};

const getProduct = (productId) => {
  const getQuery = `SELECT * FROM products_images.products WHERE id = ${productId}`;

  return client.execute(getQuery)
    .then((results) => {
      const {
        gender,
        category,
        type,
        images,
      } = results.rows[0];
      const imagesArr = [];
      Object.keys(images).map(key => imagesArr.push(images[key]));

      return {
        details: [gender, category, type],
        images: imagesArr,
      };
    });
};

const deleteProduct = (productId) => {
  const deleteQuery = `DELETE FROM products_images.products WHERE id = ${productId}`;
  return client.execute(deleteQuery);
};

const updateProduct = (productId, body) => {
  const updateRecord = 'UPDATE products_images.products SET gender = ?, category = ?, type = ?, images = ? WHERE id = ?';
  const {
    gender,
    category,
    type,
    images,
  } = body;

  const imagesMap = {};
  images.forEach((url, i) => {
    imagesMap[i] = url;
  });

  const params = [gender, category, type, imagesMap, productId];

  return client.execute(updateRecord, params, { prepare: true });
};

const createProduct = (body) => {
  const selectNextId = 'SELECT next_id FROM products_images.ids WHERE id_name = \'product_incrementer\'';
  const insertNewRecord = 'INSERT INTO products_images.products (id, gender, category, type, images) VALUES (?, ?, ?, ?, ?)';
  const updateNextId = 'UPDATE products_images.ids SET next_id=? WHERE id_name = \'product_incrementer\'';
  let nextId;

  const {
    gender,
    category,
    type,
    images,
  } = body;

  return client.execute(selectNextId)
    .then((result) => {
      nextId = result.rows[0].next_id;
      const imagesMap = {};
      images.forEach((url, i) => {
        imagesMap[i] = url;
      });

      const params = [nextId, gender, category, type, imagesMap];

      return client.execute(insertNewRecord, params, { prepare: true });
    })
    .then(() => {
      const params = [nextId + 1];
      return client.execute(updateNextId, params, { prepare: true });
    })
    .then(() => ({ id: nextId }));
};

module.exports = {
  connect,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
