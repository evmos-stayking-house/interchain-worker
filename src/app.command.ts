import { AutoCompoundService } from './tasks/auto-compound/auto-compound.service';
import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import {StaykingLiquidationService} from "./tasks/stayking-liquidation/stayking-liquidation.service";

@Injectable()
export class AppCommand {
  constructor(
    private readonly autoCompoundService: AutoCompoundService,
    private readonly staykingLiquidationService:StaykingLiquidationService
  ) {}

  @Command({
    command: 'evmos:delegation:tx <validatorAddress>',
    describe: 'To vote a validator',
  })
  async vote(
    @Positional({
      name: 'validatorAddress',
      describe: 'validator address',
      type: 'string',
    })
    validatorAddress: string,
    @Option({
      name: 'fromAddress',
      describe: 'fromAddress (ex: cosmos1xxxx)',
      alias: 'from',
      type: 'string',
      required: true,
    })
    fromAddress: string,
  ) {
    await this.autoCompoundService.votingProcess({ validatorAddress, fromAddress });
  }


  @Command({
    command: 'evmos:liquidation:bot',
    describe: 'liquidation bot',
  })
  async liquidation(
    @Option({
      name: 'vaultAddress',
      describe: 'vaultAddress (ex: 0x1234)',
      alias: 'vault',
      type: 'string',
      required: true,
    })
      vaultAddress: string) {
    await this.staykingLiquidationService.exec(vaultAddress);
  }

}
