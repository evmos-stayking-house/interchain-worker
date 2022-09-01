import { Injectable } from '@nestjs/common';
import { generateEndpointBalances } from '@tharsis/provider';
import { EVMOS_TESTNET_END_POINT } from '../../../constants/environments';
import axios from 'axios';

interface BalanceInfo {
  balances: Array<{
    demon: string;
    amount: string;
  }>;
  pagination: {
    next_key: any;
    total: string;
  };
}

interface Response<T> {
  data: T;
}

@Injectable()
export class CosmProviderService {
  async getBalance(_address: string): Promise<Response<BalanceInfo>> {
    const uri = `${EVMOS_TESTNET_END_POINT}${generateEndpointBalances(
      _address,
    )}`;
    const result = await axios.get(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return { data: result.data };
  }
}
