const nano = require('nano')('http://localhost:5984/');

const productsImages = nano.use('products_images');

const getProduct = (productId, callback) => {
  productsImages.view('products', 'product', { key: Number(productId) }, (err, body) => {
    if (!err) {
      const {
        gender,
        category,
        type,
        images,
      } = body.rows[0].value;
      const packet = {
        details: [gender, category, type],
        images,
      };

      callback(null, packet);
    } else {
      callback(err);
    }
  });
};

const deleteProduct = (productId, callback) => {
  productsImages.view('products', 'product', { key: Number(productId) }, (err, body) => {
    if (!err) {
      const doc = body.rows[0].value;

      productsImages.destroy(doc._id, doc._rev, (destroyError) => {
        if (!destroyError) {
          callback();
        } else {
          callback(destroyError);
        }
      });
    } else {
      callback(err);
    }
  });
};

const updateProduct = (body, callback) => {
  const {
    id,
    gender,
    category,
    type,
    images,
  } = body;

  productsImages.view('products', 'product', { key: id }, (err, response) => {
    if (!err) {
      const doc = response.rows[0].value;
      const updatedDocument = doc;
      updatedDocument.gender = gender;
      updatedDocument.category = category;
      updatedDocument.type = type;
      updatedDocument.images = images;
      
      productsImages.insert(updatedDocument, (err, body) => {
        if (!err) {
          callback(null, body);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

const createProduct = (body, callback) => {
  productsImages.view('products', 'maxStats', (err, response) => {
    if (!err) {
      const nextId = response.rows[0].value.max + 1;
      const newDocument = body;
      newDocument.id = nextId;

      productsImages.insert(newDocument, (insertErr) => {
        if (!insertErr) {
          callback(null, newDocument);
        } else {
          callback(insertErr);
        }
      });
    } else {
      callback(err);
    }
  });
};

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
