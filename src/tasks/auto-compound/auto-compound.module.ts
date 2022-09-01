import { Module } from '@nestjs/common';
import { CosmTransactionModule } from '../../modules/transaction/cosmos/cosm-transaction.module';
import { CosmProviderModule } from '../../modules/provider/cosmos/cosm-provider.module';
import { WalletModule } from '../../modules/wallet/wallet.module';
import { AutoCompoundService } from './auto-compound.service';

@Module({
  imports: [
    CosmTransactionModule,
    CosmProviderModule,
    WalletModule,
  ],
  providers: [AutoCompoundService],
  exports: [AutoCompoundService]
})
export class AutoCompoundModule {}
