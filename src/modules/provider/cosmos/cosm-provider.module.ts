import { Module } from '@nestjs/common';
import { CosmProviderService } from './cosm-provider.service';

@Module({
  providers: [CosmProviderService],
  exports: [CosmProviderService],
})
export class CosmProviderModule {}
