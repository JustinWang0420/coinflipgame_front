import { chainId } from 'wagmi'


// Enums
export const SupportedChainId = {
    OPTIMISM: chainId.optimism,
    OPTIMISM_GOERLI: chainId.optimismGoerli,
    LOCAL: 31337,
};

export const TimeHorizonRange = {
    FIVE_DAYS: '5d',
    FIFTEEN_DAYS: '15d',
    ONE_MONTH: '1M',
    THREE_MONTHS: '3M',
    SIX_MONTHS: '6M',
    TWELVE_MONTHS: '12M',
};

export const SimulationMode = {
    SIM: 'SIM',
    WALLET: 'WALLET',
};

export const MetricsTabOptions = {
    HISTORIC: 'Historic Backtesting',
    PREDICTION: 'Predictive Prices',
};

export const Asset = {
    USDC: 'USDC',
    ETH: 'ETH',
};

export const ResolutionTabOptions = {
    THIRTY_MINUTES: '30m',
    ONE_HOUR: '1h',
    FOUR_HOURS: '4h',
    ONE_DAY: '1d',
};

export const RestrictedLocations = {
    US: 'US',
};

export const TermsOfServiceModalTrigger = {
    BANNED: 'BANNED',
    LOCATION_RESTRICTED: 'LOCATION_RESTRICTED',
    USER_CLICK: 'USER_CLICK',
    FIRST_LOAD: 'FIRST_LOAD',
};

export const TokenSymbolLookup = {
    PERP: 'PERP',
};
