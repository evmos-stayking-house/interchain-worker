import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { KepcoModule } from './kepco/kepco.module';

@Module({
  imports: [CommandModule, KepcoModule],
})
export class AppModule {}
