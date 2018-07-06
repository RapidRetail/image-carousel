const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  keyspace: 'products_images',
});

const getProduct = (productId, callback) => {
  const getQuery = `SELECT * FROM products_images.products WHERE id = ${productId}`;

  client.execute(getQuery)
    .then((results) => {
      const {
        gender,
        category,
        type,
        images,
      } = results.rows[0];
      const imagesArr = [];
      Object.keys(images).map(key => imagesArr.push(images[key]));

      const packet = {
        details: [gender, category, type],
        images: imagesArr,
      };
      callback(null, packet);
    })
    .catch(err => callback(err));
};

const deleteProduct = (productId, callback) => {

};

const updateProduct = (body, callback) => {

};

const createProduct = (callback) => {

};

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};