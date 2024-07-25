interface TimeInfo {
    updatedISO: string;
}

interface CurrencyInfo {
    code: string;
    rate: string;
    description: string;
}

export interface BpiInfo {
    USD: CurrencyInfo;
    GBP: CurrencyInfo;
    EUR: CurrencyInfo;
}

export interface BitcoinData {
    time: TimeInfo;
    disclaimer: string;
    bpi: BpiInfo;
    error: string | null;
    loading: boolean;
}
