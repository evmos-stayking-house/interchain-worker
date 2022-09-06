import { Injectable } from '@nestjs/common';
import { broadcast, signTransaction } from '@hanchon/evmos-ts-wallet';
import { EVMOS_TESTNET_END_POINT } from '../../constants/environments';
import { Wallet } from '@ethersproject/wallet';
import { UnsignedTransaction } from '../transaction/cosmos/interfaces';

@Injectable()
export class WalletService {
  constructor() {}

  async getWalletFrom(mnemonic: string): Promise<Wallet> {
    return Wallet.fromMnemonic(mnemonic);
  }

  async sendSignedTx(
    wallet: Wallet,
    unSignedTx: UnsignedTransaction,
  ): Promise<any> {
    const signTx = await signTransaction(wallet, unSignedTx);
    return broadcast(signTx, EVMOS_TESTNET_END_POINT);
  }
}
