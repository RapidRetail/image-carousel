const nano = require('nano')('http://localhost:5984');
const couchimport = require('couchimport');
const path = require('path');

const loadData = () => {
  const options = {
    COUCH_FILETYPE: 'jsonl',
    COUCH_URL: 'http://localhost:5984',
    COUCH_DATABASE: 'products_images',
    COUCH_PARALLELISM: 10,
  };

  couchimport.importFile(path.resolve(__dirname, './couchSeed.json'), options, (err, data) => {
    console.log('upload complete!', err, data);
  }).on('written', (data) => {
    console.log(data);
  });
};

nano.db.destroy('products_images', () => {
  nano.db.create('products_images', () => {
    console.log('table created, beginning json dump..');
    loadData();
  });
});
