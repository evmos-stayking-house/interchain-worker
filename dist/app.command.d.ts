import { AutoCompoundService } from './entries/auto-compound/auto-compound.service';
export declare class AppCommand {
    private readonly appService;
    constructor(appService: AutoCompoundService);
    vote(validatorAddress: string, fromAddress: string): Promise<void>;
}
