"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const evmos_ts_wallet_1 = require("@hanchon/evmos-ts-wallet");
const environments_1 = require("../constants/environments");
const wallet_1 = require("@ethersproject/wallet");
let WalletService = class WalletService {
    constructor() { }
    async getWalletFrom(mnemonic) {
        return wallet_1.Wallet.fromMnemonic(mnemonic);
    }
    async sendSignedTx(wallet, unSignedTx) {
        const signTx = await evmos_ts_wallet_1.signTransaction(wallet, unSignedTx);
        return evmos_ts_wallet_1.broadcast(signTx, environments_1.EVMOS_TESTNET_END_POINT);
    }
};
WalletService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map