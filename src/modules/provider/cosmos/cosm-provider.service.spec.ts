import { generateEndpointBalances } from '@tharsis/provider';
import { EVMOS_TESTNET_END_POINT } from '../../../constants/environments';
import axios from 'axios';

test('balance of evmos native coin', async () => {
  const uri = `${EVMOS_TESTNET_END_POINT}${generateEndpointBalances(
    `evmos1h82qusem2s60mjagp4q9lyrpgw4r2s3h6xddse`,
  )}`;
  console.log(`uri : `, uri);
  const result = await axios.get(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const res = result.data;
  console.log(res);
});
