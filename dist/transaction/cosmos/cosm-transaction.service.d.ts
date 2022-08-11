import { Wallet } from '@ethersproject/wallet';
import { UnsignedTransaction } from './interfaces';
export declare class CosmTransactionService {
    makeUnsignedDelegationTx(wallet: Wallet, amount: string, validatorAddress: string): Promise<UnsignedTransaction>;
}
