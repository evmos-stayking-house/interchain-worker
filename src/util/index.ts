import BigNumber from 'bignumber.js';
import {BigNumberish, ethers} from "ethers";

export const bigNumDividedByNumber = (x: string, y: number): number => {
  return new BigNumber(x).div(new BigNumber(y)).toNumber();
};

export const bigNumMultipliedByNumber = (x: string, y: number): string => {
  return new BigNumber(x).multipliedBy(new BigNumber(y)).toFixed(0);
};

export const formatUnits = (x: string, unit?: string | BigNumberish): string => {
  return ethers.utils.formatUnits(x, unit);
}
