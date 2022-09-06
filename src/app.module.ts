import { Module } from '@nestjs/common';
import {AppCommand} from "./app.command";
import {CommandModule} from "nestjs-command";
import {AutoCompoundModule} from "./tasks/auto-compound/auto-compound.module";
import {StaykingLiquidationModule} from "./tasks/stayking-liquidation/stayking-liquidation.module";
import { ConfigModule } from '@nestjs/config';
import configuration from "./config/configuration";

@Module({
  imports: [
    AutoCompoundModule,
    StaykingLiquidationModule,
    CommandModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  providers: [AppCommand],
  exports: [AppCommand]
})
export class AppModule {}
