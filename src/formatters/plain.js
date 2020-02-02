import _ from 'lodash';

const getValue = (value) => {
  if (value instanceof Object) return '[complex value]';

  return `'${value}'`;
};

const buildPath = (path, key) => (path === '' ? key : `${path}.${key}`);

const plainRender = (ast, path = '') => {
  const result = ast.map((item) => {
    if (item.type === 'added') {
      return [`Property '${buildPath(path, item.key)}' was added with value: ${getValue(item.value)}`];
    }

    if (item.type === 'deleted') {
      return [`Property '${buildPath(path, item.key)}' was removed`];
    }

    if (item.type === 'changed') {
      return [`Property '${buildPath(path, item.key)}' was updated. From ${getValue(item.valueBefore)} to ${getValue(item.valueAfter)}`];
    }

    if (item.type === 'unchanged') {
      return [`Property '${buildPath(path, item.key)}' was left unchanged`];
    }

    return [`${plainRender(item.children, buildPath(path, item.key))}`];
  });

  return _.flattenDeep(result).join('\n');
};

export default plainRender;
