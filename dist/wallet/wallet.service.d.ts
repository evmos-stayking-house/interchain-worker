import { Wallet } from '@ethersproject/wallet';
import { UnsignedTransaction } from '../transaction/cosmos/interfaces';
export declare class WalletService {
    constructor();
    getWalletFrom(mnemonic: string): Promise<Wallet>;
    sendSignedTx(wallet: Wallet, unSignedTx: UnsignedTransaction): Promise<any>;
}
