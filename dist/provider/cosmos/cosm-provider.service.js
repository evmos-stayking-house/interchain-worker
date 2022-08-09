"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmProviderService = void 0;
const common_1 = require("@nestjs/common");
const provider_1 = require("@tharsis/provider");
const environments_1 = require("../../constants/environments");
const axios_1 = require("axios");
let CosmProviderService = class CosmProviderService {
    async getBalance(_address) {
        const uri = `${environments_1.EVMOS_TESTNET_END_POINT}${provider_1.generateEndpointBalances(_address)}`;
        const result = await axios_1.default.get(uri, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        return { data: result.data };
    }
};
CosmProviderService = __decorate([
    common_1.Injectable()
], CosmProviderService);
exports.CosmProviderService = CosmProviderService;
//# sourceMappingURL=cosm-provider.service.js.map