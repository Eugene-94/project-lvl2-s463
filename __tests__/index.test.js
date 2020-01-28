import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test.each([
  ['before.json', 'after.json', 'result.txt'],
  ['before.yml', 'after.yml', 'result.txt'],
  ['before.ini', 'after.ini', 'result.txt'],
  ['before-tree.json', 'after-tree.json', 'result-tree.txt'],
  ['before-tree.yml', 'after-tree.yml', 'result-tree.txt'],
  ['before-tree.ini', 'after-tree.ini', 'result-tree.txt'],
])('.gendiff(%s, %s)', (before, after, result) => {
  const pathBefore = path.resolve(__dirname, `__fixtures__/${before}`);
  const pathAfter = path.resolve(__dirname, `__fixtures__/${after}`);
  const pathResult = path.resolve(__dirname, `__fixtures__/${result}`);

  const resultData = fs.readFileSync(pathResult, 'utf-8').trim();
  expect(gendiff(pathBefore, pathAfter)).toBe(resultData);
});
