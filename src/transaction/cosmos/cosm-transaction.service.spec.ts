import { Wallet } from '@ethersproject/wallet';
import {
  createTxMsgBeginRedelegate,
  createTxMsgDelegate,
} from '@tharsis/transactions';
import {
  broadcast,
  getSender,
  signTransaction,
  TESTNET_CHAIN,
} from '@hanchon/evmos-ts-wallet';
import {
  DELEGATION_TX_GAS_FEE,
  DELEGATION_TX_GAS_LIMIT,
  DENOMINATION,
  EVMOS_TESTNET_END_POINT,
  DELEGATOR_MNEMONIC,
} from '../../constants/environments';

let privateMnemonic;

beforeAll(() => {
  privateMnemonic = DELEGATOR_MNEMONIC; // env 에서 추출
});

test('delegation tx : ', async () => {
  const wallet = Wallet.fromMnemonic(privateMnemonic);
  const unSignedTx = await prepareDelegationMessage(wallet);
  const signTx = await signTransaction(wallet, unSignedTx.msg);
  const broadcastRes = await broadcast(signTx, EVMOS_TESTNET_END_POINT);
  console.log(broadcastRes);
}, 50000);

test('re delegation tx : ', async () => {
  const wallet = Wallet.fromMnemonic(privateMnemonic);
  const unSignedTx = await prepareReDelegationMessage(wallet);
  const signTx = await signTransaction(wallet, unSignedTx.msg);
  const broadcastRes = await broadcast(signTx, EVMOS_TESTNET_END_POINT);
  console.log(broadcastRes);
}, 50000);

// Function 정의

async function prepareDelegationMessage(wallet: Wallet) {
  const sender = await getSender(wallet, EVMOS_TESTNET_END_POINT);
  console.log(`sender address: `, sender);
  const msg = createTxMsgDelegate(
    TESTNET_CHAIN,
    sender,
    {
      amount: DELEGATION_TX_GAS_FEE,
      denom: DENOMINATION,
      gas: DELEGATION_TX_GAS_LIMIT,
    },
    '',
    {
      validatorAddress: 'evmosvaloper1qvc6jej73armfs5fadn9lprx768f46d9wpd7d7', // polkachu.com
      amount: '200000000000000000',
      denom: DENOMINATION,
    },
  );
  return { sender, msg };
}

async function prepareReDelegationMessage(wallet: Wallet) {
  const sender = await getSender(wallet, EVMOS_TESTNET_END_POINT);
  console.log(`sender address: `, sender);
  const msg = createTxMsgBeginRedelegate(
    TESTNET_CHAIN,
    sender,
    {
      amount: '10000000000001',
      denom: 'atevmos',
      gas: '1000000',
    },
    '',
    {
      validatorSrcAddress:
        'evmosvaloper130ft0rs3530xm272p5yz9wgemcas4nnm9ty5u5',
      validatorDstAddress:
        'evmosvaloper10t6kyy4jncvnevmgq6q2ntcy90gse3yxa7x2p4',
      amount: '200000000000000000',
      denom: 'atevmos',
    },
  );
  return { sender, msg };
}
