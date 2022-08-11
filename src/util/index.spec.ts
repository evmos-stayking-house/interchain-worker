import { bigNumDividedByNumber, bigNumMultipliedByNumber } from './index';

test('큰 수 나누기', () => {
  const a = bigNumDividedByNumber('9999022427670217187457', 1e18);
  console.log(a);
});

test('큰 수 곱하기', () => {
  const a = bigNumMultipliedByNumber('9999022427670217187457', 0.8);
  console.log(a);
});
