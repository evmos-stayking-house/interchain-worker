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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommand = void 0;
const app_service_1 = require("./app.service");
const nestjs_command_1 = require("nestjs-command");
const common_1 = require("@nestjs/common");
let AppCommand = class AppCommand {
    constructor(appService) {
        this.appService = appService;
    }
    async vote(validatorAddress, fromAddress) {
        await this.appService.votingProcess({ validatorAddress, fromAddress });
    }
};
__decorate([
    nestjs_command_1.Command({
        command: 'evmos:delegation:tx <validatorAddress>',
        describe: 'To vote a validator',
    }),
    __param(0, nestjs_command_1.Positional({
        name: 'validatorAddress',
        describe: 'validator address',
        type: 'string',
    })),
    __param(1, nestjs_command_1.Option({
        name: 'fromAddress',
        describe: 'fromAddress (ex: cosmos1xxxx)',
        alias: 'from',
        type: 'string',
        required: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppCommand.prototype, "vote", null);
AppCommand = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppCommand);
exports.AppCommand = AppCommand;
//# sourceMappingURL=app.command.js.map