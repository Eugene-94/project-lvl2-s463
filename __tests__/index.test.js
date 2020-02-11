import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFileName = (fileName, ext) => `${fileName}${ext}`;
const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

test.each([
  ['.json', 'tree', 'result-tree.txt'],
  ['.json', 'plain', 'result-plain.txt'],
  ['.json', 'json', 'result-json.txt'],
  ['.yml', 'tree', 'result-tree.txt'],
  ['.yml', 'plain', 'result-plain.txt'],
  ['.yml', 'json', 'result-json.txt'],
  ['.ini', 'tree', 'result-tree.txt'],
  ['.ini', 'plain', 'result-plain.txt'],
  ['.ini', 'json', 'result-json.txt'],
])('.gendiff(%s, %s, %s)', (extension, format, result) => {
  const pathBefore = getFixturePath(getFileName('before', extension));
  const pathAfter = getFixturePath(getFileName('after', extension));
  const pathResult = getFixturePath(result);

  const resultData = fs.readFileSync(pathResult, 'utf-8').trim();
  expect(gendiff(pathBefore, pathAfter, format)).toBe(resultData);
});
