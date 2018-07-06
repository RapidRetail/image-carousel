
const generateRandomProductId = (userContext, events, done) => {
  const randomProductId = Math.floor(Math.random() * 1000000) + 9000000;
  userContext.vars.id = randomProductId;
  return done();
};

module.exports = {
  generateRandomProductId,
};
