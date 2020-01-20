const yaml = require('js-yaml');

export default (fileExtension) => {
  const parsersType = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };

  return parsersType[fileExtension];
};
