import _ from 'lodash';
import fs from 'fs';

const getDifference = (path1, path2) => {
  const data1 = fs.readFileSync(path1, 'utf-8');
  const data2 = fs.readFileSync(path2, 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

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
