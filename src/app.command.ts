import { AppService } from './app.service';
import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppCommand {
  constructor(private readonly appService: AppService) {}

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
    await this.appService.votingProcess({ validatorAddress, fromAddress });
  }
}
