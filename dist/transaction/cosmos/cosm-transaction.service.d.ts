import { Wallet } from '@ethersproject/wallet';
import { UnsignedTransaction } from './interfaces';
export declare class CosmTransactionService {
    stakingToValidator(mnemonic: string, validatorAddress: string, amount: string): void;
    makeUnsignedDelegationTx(wallet: Wallet, amount: string, validatorAddress: string): Promise<UnsignedTransaction>;
}
