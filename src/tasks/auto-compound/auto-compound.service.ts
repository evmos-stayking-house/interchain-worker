import { Injectable } from '@nestjs/common';
import { CosmProviderService } from '../../modules/provider/cosmos/cosm-provider.service';
import { CosmTransactionService } from '../../modules/transaction/cosmos/cosm-transaction.service';
import { WalletService } from '../../modules/wallet/wallet.service';
import {
  DELEGATION_AMOUNT_RATE,
  DELEGATOR_MNEMONIC,
} from '../../constants/environments';
import { bigNumDividedByNumber, bigNumMultipliedByNumber } from '../../util';

@Injectable()
export class AutoCompoundService {
  constructor(
    private readonly providerService: CosmProviderService,
    private readonly transactionService: CosmTransactionService,
    private readonly walletService: WalletService,
  ) {}



  async votingProcess(params: {
    validatorAddress: string;
    fromAddress: string;
  }) {
    if (!DELEGATOR_MNEMONIC)
      return console.log(`Vault 의 Pk 가 설정 되어있지 않습니다.`);

    const { validatorAddress, fromAddress } = params;
    const { valid, balance } = await this._validToVote(fromAddress);
    if (!valid && this._hasEnoughAmountOf(balance))
      return console.log(
        `잔고가 충분하지 않은 상태에서 ReInvest 를 완료할 수 없습니다.`,
      );

    const wallet = await this.walletService.getWalletFrom(DELEGATOR_MNEMONIC);

    const unSignedTx = await this.transactionService.makeUnsignedDelegationTx(
      wallet,
      this._calculateDelegationAmount(balance),
      validatorAddress,
    );

    const txResponse = await this.walletService.sendSignedTx(
      wallet,
      unSignedTx,
    );
    console.log('===========[Delegation TX Result]=============');
    console.log(txResponse);
    console.log('==============================================');
  }

  _calculateDelegationAmount(balance) {
    return bigNumMultipliedByNumber(balance, DELEGATION_AMOUNT_RATE);
  }

  _hasEnoughAmountOf(balance): boolean {
    return bigNumDividedByNumber(balance.toString(), Number(1e18)) - 2000 > 0;
  }

  async _validToVote(fromAddress: string) {
    const balanceInfo = await this.providerService.getBalance(fromAddress);
    if (balanceInfo.data?.balances?.length < 0) {
      return { valid: false, balance: 0 };
    }

    return {
      valid: true,
      balance: balanceInfo.data?.balances[0].amount,
    };
  }
}
