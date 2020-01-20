import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const getDifference = (path1, path2) => {
  const firstConfigInfo = {
    extension: path.extname(path1),
    data: fs.readFileSync(path1, 'utf-8'),
  };

  const secondConfigInfo = {
    extension: path.extname(path2),
    data: fs.readFileSync(path2, 'utf-8'),
  };

  const parser = getParser(firstConfigInfo.extension);

  const obj1 = parser(firstConfigInfo.data);
  const obj2 = parser(secondConfigInfo.data);

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

  const diffs = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return obj1[key] === obj2[key] ? [...acc, `    ${key}: ${obj1[key]}`] : [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) return [...acc, `  - ${key}: ${obj1[key]}`];

    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);

  const result = ['{', ...diffs, '}'].join('\n');

  return result;
};

export default getDifference;
