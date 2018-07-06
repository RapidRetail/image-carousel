const fs = require('fs');
const helpers = require('../../seedHelpers');

const populateImageJoin = (start, end) => {
  const result = [];
  for (let productId = start; productId < end; productId += 1) {
    let rows = [];
    for (let positionIndex = 0; positionIndex < 5; positionIndex += 1) {
      const randomImageId = Math.floor(Math.random() * 1000);
      rows.push([productId, randomImageId, positionIndex].join(','));
    }
    rows = rows.join('\n');
    result.push(rows);
  }
  return `${result.join('\n')}\n`;
};

const populateImages = () => {
  let imagesDoc = [];
  for (let i = 0; i < 1000; i++) {
    imagesDoc.push([i, `https://s3-us-west-1.amazonaws.com/imagesrapidretail/${i}.jpg`].join(','));
  }
  imagesDoc = imagesDoc.join('\n');
  fs.appendFileSync('./images_seed.csv', imagesDoc);
};

const populateProductsData = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push([
      helpers.getRandomGender(),
      helpers.getRandomCategory(),
      helpers.getRandomType(),
    ].join(','));
  }
  return `${result.join('\n')}\n`;
};

populateImages();

let start = 1;
let end = 100001;

while (start < 10000001) {
  let imageJoinDoc = populateImageJoin(start, end);
  let productsDoc = populateProductsData(start, end);

  fs.appendFileSync('./product_image_join_seed.csv', imageJoinDoc);
  fs.appendFileSync('./products_seed.csv', productsDoc);
  console.log('Wrote 100k to Files');

  imageJoinDoc = '';
  productsDoc = '';
  start += 100000;
  end += 100000;
}
