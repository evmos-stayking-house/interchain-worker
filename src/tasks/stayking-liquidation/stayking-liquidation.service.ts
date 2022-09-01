import { Injectable } from '@nestjs/common';
import * as ethers from 'ethers';
import { StaykingContractABI, vaultContractABI } from '../../config/abi';
import { ConfigService } from '@nestjs/config';
import { Contract } from 'ethers';
import { formatUnits } from '../../util';
import { Signer } from '@ethersproject/abstract-signer';

interface KillablePosition {
  positionId: number;
  killable: boolean;
}

@Injectable()
export class StaykingLiquidationService {
  protected signer: Signer;
  protected provider;
  protected stayKingContract: Contract;

  constructor(private configService: ConfigService) {
    const NODE_URL = this.configService.get<string>('NODE_URL');
    const BOT_PRIVATE_KEY = this.configService.get<string>('BOT_PRIVATE_KEY');
    const STAYKING_CONTRACT_ADDRESS = this.configService.get<string>('STAYKING_CONTRACT_ADDRESS');

    this.provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    this.signer = new ethers.Wallet(BOT_PRIVATE_KEY, this.provider);
    this.stayKingContract = new ethers.Contract(STAYKING_CONTRACT_ADDRESS, StaykingContractABI, this.signer);
  }

  async exec(vaultAddress: string) {
    const vaultContract = this.getVaultContract(vaultAddress);
    const posLen = await this.getPositionLengthOf(vaultAddress);
    const vaultName = await vaultContract.name();

    console.log(`We are ready for liquidate total ${posLen} positions from the vault ${vaultName}`);

    const killablePositions: KillablePosition[] = await this.aggregateKillablePositions(Number(posLen), vaultContract);

    await this.killPositions(killablePositions, vaultContract);
  }

  async killPositions(killablePositions: KillablePosition[], vaultContract: Contract) {
    const tokenAddress = await vaultContract.token();
    const from = await this.signer.getAddress();

    for (const { positionId } of killablePositions) {
      // re check...
      const isKillable = await this.stayKingContract.isKillable(tokenAddress, positionId);

      if (!isKillable) continue;

      try {
        await this.stayKingContract.kill(tokenAddress, positionId, {
          from
        });

        console.log(
          `Your cron function for liquidation in ${this.stayKingContract.name_} for position ${positionId} works`
        );
      } catch (error) {
        /* Slack Urgent Message : TBD */
        console.log(`liquidation for the position failed :: `, { positionId, tokenAddress, reason: error.toString() });
      }
    }
  }

  async aggregateKillablePositions(posLen: number, vaultContract: Contract): Promise<KillablePosition[]> {
    const tokenAddress = await vaultContract.token();
    const argsOfPositions = Array.from({ length: posLen }).map((x, idx) => [tokenAddress, Number(idx)]);
    const stateOfPositions = await Promise.all(
      argsOfPositions.map((args) => this.stayKingContract.isKillable(...args))
    );

    return stateOfPositions
      .map<KillablePosition>((killable: boolean, positionId) => ({ positionId, killable }))
      .filter((item) => item.killable);
  }

  async getPositionLengthOf(vaultAddress: string) {
    const _positionLen = await this.stayKingContract.positionsLengthOf(vaultAddress);
    return formatUnits(String(_positionLen), '0');
  }

  getVaultContract(vaultAddress: string) {
    return new ethers.Contract(vaultAddress, vaultContractABI, this.provider);
  }
}
