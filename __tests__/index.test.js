import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathBefore = path.resolve(__dirname, '__fixtures__/before.json');
const pathAfter = path.resolve(__dirname, '__fixtures__/after.json');
const pathResult = path.resolve(__dirname, '__fixtures__/result.txt');

const resultData = fs.readFileSync(pathResult, 'utf-8').trim();

test('gendiff', () => {
  expect(gendiff(pathBefore, pathAfter)).toBe(resultData);
});
