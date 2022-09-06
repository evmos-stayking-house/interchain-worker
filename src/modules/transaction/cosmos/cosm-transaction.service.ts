import { Injectable } from '@nestjs/common';
import { createTxMsgDelegate } from '@tharsis/transactions';
import { getSender, TESTNET_CHAIN } from '@hanchon/evmos-ts-wallet';
import {
  DELEGATION_TX_GAS_FEE,
  DELEGATION_TX_GAS_LIMIT,
  DENOMINATION,
  EVMOS_TESTNET_END_POINT,
} from '../../../constants/environments';
import { Wallet } from '@ethersproject/wallet';
import { UnsignedTransaction } from './interfaces';

@Injectable()
export class CosmTransactionService {
  async makeUnsignedDelegationTx(
    wallet: Wallet,
    amount: string,
    validatorAddress: string,
  ): Promise<UnsignedTransaction> {
    const sender = await getSender(wallet, EVMOS_TESTNET_END_POINT);
    return createTxMsgDelegate(
      TESTNET_CHAIN,
      sender,
      {
        amount: DELEGATION_TX_GAS_FEE,
        denom: DENOMINATION,
        gas: DELEGATION_TX_GAS_LIMIT,
      },
      '',
      {
        validatorAddress,
        amount,
        denom: DENOMINATION,
      },
    );
  }
}
