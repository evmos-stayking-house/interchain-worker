import { bigNumDividedByNumber } from './index';

test('큰 수 나누기', () => {
  const a = bigNumDividedByNumber('9999999999999999999999999999999999', 1e18);
  console.log(a);
});
