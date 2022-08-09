"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const cosm_transaction_service_1 = require("./cosm-transaction.service");
let CosmTransactionModule = class CosmTransactionModule {
};
CosmTransactionModule = __decorate([
    common_1.Module({
        providers: [cosm_transaction_service_1.CosmTransactionService],
        exports: [cosm_transaction_service_1.CosmTransactionService],
    })
], CosmTransactionModule);
exports.CosmTransactionModule = CosmTransactionModule;
//# sourceMappingURL=cosm-transaction.module.js.map