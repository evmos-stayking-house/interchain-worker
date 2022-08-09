import { AppService } from './app.service';
export declare class AppCommand {
    private readonly appService;
    constructor(appService: AppService);
    vote(validatorAddress: string, fromAddress: string): Promise<void>;
}
