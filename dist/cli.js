"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const nestjs_command_1 = require("nestjs-command");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: ['error'],
    });
    try {
        const appTimeout = setTimeout(async () => {
            await app.close();
            process.exit(0);
        }, constants_1.APP_TIMEOUT);
        await app.select(nestjs_command_1.CommandModule).get(nestjs_command_1.CommandService).exec();
        clearTimeout(appTimeout);
        await app.close();
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        await app.close();
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=cli.js.map