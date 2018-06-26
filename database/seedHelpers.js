const getRandomGender = () => {
  const genders = ['Men', 'Women', 'Girls'];
  return genders[Math.floor(Math.random() * 3)];
};

const getRandomCategory = () => {
  const categories = ['Tops', 'Bottoms', 'Swim'];
  return categories[Math.floor(Math.random() * 3)];
};

const getRandomType = () => {
  const type = ['Pants', 'Shorts', 'Shirts'];
  return type[Math.floor(Math.random() * 3)];
};

const getRandomImage = () => {
  const i = Math.floor(Math.random() * 1000);
  return `https://s3-us-west-1.amazonaws.com/imagesrapidretail/${i}.jpg`;
};

module.exports = {
  getRandomGender,
  getRandomCategory,
  getRandomType,
  getRandomImage,
};
