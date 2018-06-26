const fs = require('fs');
const request = require('request');

const download = (uri, filename) => {
  request(uri, { encoding: 'binary' }, (error, res, body) => {
    if (error) {
      console.log(error);
    }

    if (!res || !res.headers || !res.headers['content-length']) {
      setTimeout(() => {
        console.log(`trying ${filename} again!`);
        download(uri, filename);
      }, 2000);
    }

    fs.writeFile(filename, body, 'binary', () => {
      console.log(`wrote ${filename}`);
    });
  });
};

for (let i = 0; i < 1000; i += 1) {
  download('https://picsum.photos/645/870/?random', `./images/${i}.jpg`);
}
