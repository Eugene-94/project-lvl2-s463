import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test.each([
  ['.json', 'tree', 'result-tree.txt'],
  ['.json', 'plain', 'result-plain.txt'],
  ['.yml', 'tree', 'result-tree.txt'],
  ['.yml', 'plain', 'result-plain.txt'],
  ['.ini', 'tree', 'result-tree.txt'],
  ['.ini', 'plain', 'result-plain.txt'],
])('.gendiff(%s, %s, %s)', (extension, format, result) => {
  const pathBefore = path.resolve(__dirname, `__fixtures__/before${extension}`);
  const pathAfter = path.resolve(__dirname, `__fixtures__/after${extension}`);
  const pathResult = path.resolve(__dirname, `__fixtures__/${result}`);

  const resultData = fs.readFileSync(pathResult, 'utf-8').trim();
  expect(gendiff(pathBefore, pathAfter, format)).toBe(resultData);
});
