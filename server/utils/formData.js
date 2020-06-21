const _ = require('lodash');

const formData = (data) => {
  const formString = _.reduce(data, (acc, value, key) => {
    return acc += `${key}=${encodeURIComponent(value)}&`;
  }, '');
  return formString.slice(0,-1);
}

module.exports = {
  formData
}