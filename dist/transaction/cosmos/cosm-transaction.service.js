"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmTransactionService = void 0;
const common_1 = require("@nestjs/common");
const transactions_1 = require("@tharsis/transactions");
const evmos_ts_wallet_1 = require("@hanchon/evmos-ts-wallet");
const environments_1 = require("../../constants/environments");
let CosmTransactionService = class CosmTransactionService {
    stakingToValidator(mnemonic, validatorAddress, amount) { }
    async makeUnsignedDelegationTx(wallet, amount, validatorAddress) {
        const sender = await evmos_ts_wallet_1.getSender(wallet, environments_1.EVMOS_TESTNET_END_POINT);
        return transactions_1.createTxMsgDelegate(evmos_ts_wallet_1.TESTNET_CHAIN, sender, {
            amount: environments_1.DELEGATION_TX_GAS_FEE,
            denom: environments_1.DENOMINATION,
            gas: environments_1.DELEGATION_TX_GAS_LIMIT,
        }, '', {
            validatorAddress,
            amount,
            denom: environments_1.DENOMINATION,
        });
    }
};
CosmTransactionService = __decorate([
    common_1.Injectable()
], CosmTransactionService);
exports.CosmTransactionService = CosmTransactionService;
//# sourceMappingURL=cosm-transaction.service.js.map