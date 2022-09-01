"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompoundModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const cosm_transaction_module_1 = require("../../transaction/cosmos/cosm-transaction.module");
const cosm_provider_module_1 = require("../../provider/cosmos/cosm-provider.module");
const wallet_module_1 = require("../../wallet/wallet.module");
const app_command_1 = require("../../app.command");
const auto_compound_service_1 = require("./auto-compound.service");
let AutoCompoundModule = class AutoCompoundModule {
};
AutoCompoundModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_command_1.CommandModule,
            cosm_transaction_module_1.CosmTransactionModule,
            cosm_provider_module_1.CosmProviderModule,
            wallet_module_1.WalletModule,
        ],
        providers: [auto_compound_service_1.AutoCompoundService, app_command_1.AppCommand],
    })
], AutoCompoundModule);
exports.AutoCompoundModule = AutoCompoundModule;
//# sourceMappingURL=auto-compound.module.js.map