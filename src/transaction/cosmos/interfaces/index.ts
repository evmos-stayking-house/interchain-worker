export interface UnsignedTransaction {
  signDirect: {
    body: import('@tharsis/proto/dist/proto/cosmos/tx/v1beta1/tx').cosmos.tx.v1beta1.TxBody;
    authInfo: import('@tharsis/proto/dist/proto/cosmos/tx/v1beta1/tx').cosmos.tx.v1beta1.AuthInfo;
    signBytes: string;
  };
  legacyAmino: {
    body: import('@tharsis/proto/dist/proto/cosmos/tx/v1beta1/tx').cosmos.tx.v1beta1.TxBody;
    authInfo: import('@tharsis/proto/dist/proto/cosmos/tx/v1beta1/tx').cosmos.tx.v1beta1.AuthInfo;
    signBytes: string;
  };
  eipToSign: {
    types: object;
    primaryType: string;
    domain: {
      name: string;
      version: string;
      chainId: number;
      verifyingContract: string;
      salt: string;
    };
    message: object;
  };
}
