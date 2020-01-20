const yaml = require('js-yaml');
const ini = require('ini');

export default (fileExtension) => {
  const parsersType = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return parsersType[fileExtension];
};
