import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';

const getData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');

  return data;
};

const typeActions = [
  {
    check: (key, obj1, obj2) => obj1[key] instanceof Object && obj2[key] instanceof Object,
    process: (key, obj1, obj2, fn) => ({
      type: 'object',
      key,
      children: fn(obj1[key], obj2[key]),
    }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    process: (key, obj1, obj2) => ({
      type: 'added',
      key,
      value: obj2[key],
    }),
  },
  {
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    process: (key, obj1) => ({
      type: 'deleted',
      key,
      value: obj1[key],
    }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    process: (key, obj1, obj2) => ({
      type: 'changed',
      key,
      valueBefore: obj1[key],
      valueAfter: obj2[key],
    }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, obj1) => ({
      type: 'unchanged',
      key,
      value: obj1[key],
    }),
  },
];

const getTypeAction = (key, obj1, obj2) => typeActions.find(({ check }) => check(key, obj1, obj2));

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const result = keys.map((currentKey) => {
    const { process } = getTypeAction(currentKey, obj1, obj2);

    return process(currentKey, obj1, obj2, buildAst);
  });

  return result;
};

export default (conf1, conf2, format = 'tree') => {
  const data1 = parse(getData(conf1), path.extname(conf1));
  const data2 = parse(getData(conf2), path.extname(conf2));
  const ast = buildAst(data1, data2);

  return render(ast, format);
};
