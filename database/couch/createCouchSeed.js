const fs = require('fs');
const helpers = require('../seedHelpers');

const populateCouchCSV = (start, end) => {
  const result = [];

  for (let i = start; i < end; i += 1) {
    const row = {
      id: i,
      gender: helpers.getRandomGender(),
      category: helpers.getRandomCategory(),
      type: helpers.getRandomType(),
      images: [
        helpers.getRandomImage(),
        helpers.getRandomImage(),
        helpers.getRandomImage(),
        helpers.getRandomImage(),
        helpers.getRandomImage(),
      ],
    };
    result.push(JSON.stringify(row));
  }

  return `${result.join('\n')}\n`;
};

let start = 1;
let end = 100001;

while (start < 10000001) {
  let couchJSONDoc = populateCouchCSV(start, end);

  fs.appendFileSync('./couchSeedTest.json', couchJSONDoc);

  console.log('wrote 100k rows');
  couchJSONDoc = '';
  start += 100000;
  end += 100000;
}

console.log('finished writing to couch json');
process.exit();
