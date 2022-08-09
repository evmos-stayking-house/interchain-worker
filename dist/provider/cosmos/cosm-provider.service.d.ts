interface BalanceInfo {
    balances: Array<{
        demon: string;
        amount: string;
    }>;
    pagination: {
        next_key: any;
        total: string;
    };
}
interface Response<T> {
    data: T;
}
export declare class CosmProviderService {
    getBalance(_address: string): Promise<Response<BalanceInfo>>;
}
export {};
