// utils / isAbsoluteURL

const isAbsoluteURL = (file) => {
  return file.startsWith('http') || file.startsWith('//');
};

module.exports = isAbsoluteURL;
