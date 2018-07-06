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
      const {
        _id,
        _rev,
      } = body.rows[0].value;

      productsImages.destroy(_id, _rev, (destroyError) => {
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
      console.log(response);

      const {
        _id,
        _rev,
      } = response.rows[0].value;

      const updatedDocument = {
        _id,
        _rev,
        gender,
        category,
        type,
        images,
      };
      
      console.log(updatedDocument);

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

const createProduct = (callback) => {

};

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};


function(doc) {
  var key, value;
  key = doc.id;
  value = doc
  emit(key, value);
}