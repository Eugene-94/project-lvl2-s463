import _ from 'lodash';

const getTabs = (depth) => ' '.repeat(depth * 2);

const stringify = (obj, depth) => {
  if (!(obj instanceof Object)) return obj;

  const openingTabs = getTabs(depth + 2);
  const closingTabs = getTabs(depth);
  const keys = Object.keys(obj);

  return ['{', ...keys.map((key) => `${openingTabs}  ${key}: ${obj[key]}`), `${closingTabs}  }`].join('\n');
};

const preRender = (ast, depth = 1) => {
  const result = ast.map((item) => {
    const tabs = getTabs(depth);

    switch (item.type) {
      case 'added':
        return [`${tabs}+ ${item.key}: ${stringify(item.value, depth)}`];
      case 'deleted':
        return [`${tabs}- ${item.key}: ${stringify(item.value, depth)}`];
      case 'changed':
        return [
          [`${tabs}- ${item.key}: ${stringify(item.valueBefore, depth)}`],
          [`${tabs}+ ${item.key}: ${stringify(item.valueAfter, depth)}`],
        ];
      case 'unchanged':
        return [`${tabs}  ${item.key}: ${stringify(item.value, depth)}`];
      default:
        return [`${tabs}  ${item.key}: {`, preRender(item.children, depth + 2), `${tabs}  }`];
    }
  });

  return result;
};

export default (ast) => _.flattenDeep(['{', preRender(ast), '}']).join('\n');
