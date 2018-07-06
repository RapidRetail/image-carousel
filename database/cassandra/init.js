const cassandra = require('cassandra-driver');
const helpers = require('../seedHelpers');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  keyspace: 'products_images',
});

// // couldn't create keyspace from anything other than command line
// const dropKS = 'DROP KEYSPACE IF EXISTS products_images;';
// const createKS = `CREATE KEYSPACE products_images
//  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};`;

const dropProducts = 'DROP TABLE IF EXISTS products_images.products;';
const createQuery = `
CREATE TABLE products_images.products (
  id int PRIMARY KEY, 
  gender text, 
  category text, 
  type text, 
  images map<int, text>
);`;

const createProductsAndImagesTable = () =>
  client.execute(dropProducts)
    .then(() => client.execute(createQuery));

const createQueryArray = (start, end) => {
  const insertQuery = 'INSERT INTO products_images.products (id, gender, category, type, images) VALUES (?, ?, ?, ?, ?)';
  const queriesArray = [];

  for (let i = start; i < end; i += 1) {
    const queryObject = {
      query: insertQuery,
      params: [
        i,
        helpers.getRandomGender(),
        helpers.getRandomCategory(),
        helpers.getRandomType(),
        {
          0: helpers.getRandomImage(),
          1: helpers.getRandomImage(),
          2: helpers.getRandomImage(),
          3: helpers.getRandomImage(),
          4: helpers.getRandomImage(),
        },
      ],
    };

    queriesArray.push(queryObject);
  }

  return queriesArray;
};

let start = 1;
let end = 101;
let limit = 10000000;

const writeToDB = (first, last) => {
  if (first === 1) {
    createProductsAndImagesTable()
      .then(() => {
        console.log('created products schema');

        client.batch(createQueryArray(first, last), { prepare: true })
          .then(() => {
            console.log(`inserted ${last - 1}/${limit} rows`);
            start += 100;
            end += 100;

            writeToDB(start, end);
          });
      });
  } else if (first > limit) {
    process.exit();
  } else {
    client.batch(createQueryArray(first, last), { prepare: true })
      .then(() => {
        console.log(`inserted ${last - 1}/${limit} rows`);
        start += 100;
        end += 100;

        writeToDB(start, end);
      });
  }
};

writeToDB(1, 101);
