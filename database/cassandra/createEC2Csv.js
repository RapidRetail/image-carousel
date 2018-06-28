const cassandra = require('cassandra-driver');
const helpers = require('../seedHelpers');

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
let end = 11;
const limit = 10000000;

const writeToDB = (first, last) => {
  if (first === 1) {
    createProductsAndImagesTable()
      .then(() => {
        console.log('created products schema');

        client.batch(createQueryArray(first, last), { prepare: true })
          .then(() => {
            console.log(`inserted ${last - 1}/${limit} rows`);
            start += 10;
            end += 10;

            writeToDB(start, end);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  } else if (first > limit) {
    process.exit();
  } else {
    client.batch(createQueryArray(first, last), { prepare: true })
      .then(() => {
        console.log(`inserted ${last - 1}/${limit} rows`);
        start += 10;
        end += 10;

        writeToDB(start, end);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

writeToDB(1, 101);
