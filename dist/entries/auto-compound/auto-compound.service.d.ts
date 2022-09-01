import { CosmProviderService } from '../../provider/cosmos/cosm-provider.service';
import { CosmTransactionService } from '../../transaction/cosmos/cosm-transaction.service';
import { WalletService } from '../../wallet/wallet.service';
export declare class AutoCompoundService {
    private readonly providerService;
    private readonly transactionService;
    private readonly walletService;
    constructor(providerService: CosmProviderService, transactionService: CosmTransactionService, walletService: WalletService);
    votingProcess(params: {
        validatorAddress: string;
        fromAddress: string;
    }): Promise<void>;
    _calculateDelegationAmount(balance: any): string;
    _hasEnoughAmountOf(balance: any): boolean;
    _validToVote(fromAddress: string): Promise<{
        valid: boolean;
        balance: number;
    } | {
        valid: boolean;
        balance: string;
    }>;
}
