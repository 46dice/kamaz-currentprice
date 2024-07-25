interface TimeInfo {
    updated: string;
    updatedISO: string;
    updateduk: string;
}

interface CurrencyInfo {
    code: string;
    rate: string;
    description: string;
    rate_float: number;
}

export interface BpiInfo {
    USD: CurrencyInfo;
    GBP: CurrencyInfo;
    EUR: CurrencyInfo;
}

export interface BitcoinData {
    time: TimeInfo;
    disclaimer: string;
    chartName: string;
    bpi: BpiInfo;
    error: string | null;
    loading: boolean;
}
