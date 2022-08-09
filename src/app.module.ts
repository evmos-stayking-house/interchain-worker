import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CosmTransactionModule } from './transaction/cosmos/cosm-transaction.module';
import { CosmProviderModule } from './provider/cosmos/cosm-provider.module';
import { WalletModule } from './wallet/wallet.module';
import { AppCommand } from './app.command';
import { AppService } from './app.service';

@Module({
  imports: [
    CommandModule,
    CosmTransactionModule,
    CosmProviderModule,
    WalletModule,
  ],
  providers: [AppService, AppCommand],
})
export class AppModule {}
