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
exports.AutoCompoundService = void 0;
const common_1 = require("@nestjs/common");
const cosm_provider_service_1 = require("../../provider/cosmos/cosm-provider.service");
const cosm_transaction_service_1 = require("../../transaction/cosmos/cosm-transaction.service");
const wallet_service_1 = require("../../wallet/wallet.service");
const environments_1 = require("../../constants/environments");
const util_1 = require("../../util");
let AutoCompoundService = class AutoCompoundService {
    constructor(providerService, transactionService, walletService) {
        this.providerService = providerService;
        this.transactionService = transactionService;
        this.walletService = walletService;
    }
    async votingProcess(params) {
        if (!environments_1.DELEGATOR_MNEMONIC)
            return console.log(`Vault 의 Pk 가 설정 되어있지 않습니다.`);
        const { validatorAddress, fromAddress } = params;
        const { valid, balance } = await this._validToVote(fromAddress);
        if (!valid && this._hasEnoughAmountOf(balance))
            return console.log(`잔고가 충분하지 않은 상태에서 ReInvest 를 완료할 수 없습니다.`);
        const wallet = await this.walletService.getWalletFrom(environments_1.DELEGATOR_MNEMONIC);
        const unSignedTx = await this.transactionService.makeUnsignedDelegationTx(wallet, this._calculateDelegationAmount(balance), validatorAddress);
        const txResponse = await this.walletService.sendSignedTx(wallet, unSignedTx);
        console.log('===========[Delegation TX Result]=============');
        console.log(txResponse);
        console.log('==============================================');
    }
    _calculateDelegationAmount(balance) {
        return util_1.bigNumMultipliedByNumber(balance, environments_1.DELEGATION_AMOUNT_RATE);
    }
    _hasEnoughAmountOf(balance) {
        return util_1.bigNumDividedByNumber(balance.toString(), Number(1e18)) - 2000 > 0;
    }
    async _validToVote(fromAddress) {
        var _a, _b, _c;
        const balanceInfo = await this.providerService.getBalance(fromAddress);
        if (((_b = (_a = balanceInfo.data) === null || _a === void 0 ? void 0 : _a.balances) === null || _b === void 0 ? void 0 : _b.length) < 0) {
            return { valid: false, balance: 0 };
        }
        return {
            valid: true,
            balance: (_c = balanceInfo.data) === null || _c === void 0 ? void 0 : _c.balances[0].amount,
        };
    }
};
AutoCompoundService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cosm_provider_service_1.CosmProviderService,
        cosm_transaction_service_1.CosmTransactionService,
        wallet_service_1.WalletService])
], AutoCompoundService);
exports.AutoCompoundService = AutoCompoundService;
//# sourceMappingURL=auto-compound.service.js.map