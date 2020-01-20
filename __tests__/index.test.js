import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test.each([
  ['before.json', 'after.json', 'result.txt'],
  ['before.yml', 'after.yml', 'result.txt'],
])('.gendiff(%s, %s)', (before, after, result) => {
  const pathBefore = path.resolve(__dirname, `__fixtures__/${before}`);
  const pathAfter = path.resolve(__dirname, `__fixtures__/${after}`);
  const pathResult = path.resolve(__dirname, `__fixtures__/${result}`);

  const resultData = fs.readFileSync(pathResult, 'utf-8').trim();
  expect(gendiff(pathBefore, pathAfter)).toBe(resultData);
});
