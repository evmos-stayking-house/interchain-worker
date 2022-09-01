import { Module } from '@nestjs/common';
import { CosmTransactionService } from './cosm-transaction.service';

@Module({
  providers: [CosmTransactionService],
  exports: [CosmTransactionService],
})
export class CosmTransactionModule {}
