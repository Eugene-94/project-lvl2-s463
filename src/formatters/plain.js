import _ from 'lodash';

const getValue = (value) => {
  if (value instanceof Object) return '[complex value]';

  return `'${value}'`;
};

const buildPath = (path, key) => (path === '' ? key : `${path}.${key}`);

const plainRender = (ast, path = '') => {
  const result = ast.map((item) => {
    switch (item.type) {
      case 'added':
        return [`Property '${buildPath(path, item.key)}' was added with value: ${getValue(item.value)}`];
      case 'deleted':
        return [`Property '${buildPath(path, item.key)}' was removed`];
      case 'changed':
        return [`Property '${buildPath(path, item.key)}' was updated. From ${getValue(item.valueBefore)} to ${getValue(item.valueAfter)}`];
      case 'unchanged':
        return [`Property '${buildPath(path, item.key)}' was left unchanged`];
      default:
        return [`${plainRender(item.children, buildPath(path, item.key))}`];
    }
  });

  return _.flattenDeep(result).join('\n');
};

export default plainRender;
