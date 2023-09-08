import { chain } from 'wagmi'
import ImageOptimism from '../assets/imgs/optimism.png'
import { SupportedChainId } from './enums'

// Addresses

// This is Component Fi's public address for delegating transactions and receiving rewards on Perp
export const VITE_DELEGATE_ADDRESS = process.env.VITE_DELEGATE_ADDRESS

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const PERP_TOKENS_ALLOCATED_PER_WEEK = 5000

export const PERP_FEES = 1000

export const NetworkContextName = 'NETWORK'

export const DAYS_IN_A_WEEK = 7

export const DAYS_IN_A_MONTH = 31

export const DAYS_IN_A_YEAR = 365

export const HOURS_IN_A_DAY = 24

export const SECONDS_IN_AN_HOUR = 3600

export const DEFAULT_USER_INVESTMENT = 100

export const DEFAULT_CHAIN = SupportedChainId.OPTIMISM_GOERLI

// Environment constants

export const ALCHEMY_ID = process.env.VITE_ALCHEMY_ID

export const PERP_API_KEY = process.env.VITE_PERP_CANDLESTICK_API_KEY

export const IP_INFO_API_KEY = process.env.VITE_IP_INFO_API_KEY

export const PERP_MARKET_REWARDS_API_KEY =
    process.env.VITE_PERP_MARKET_REWARDS_API_KEY

export const ENVIRONMENT = process.env.VITE_ENVIRONMENT

export const ENV_IS_DEV = process.env.DEV

export const ENV_IS_PROD = process.env.PROD

export const MODE = process.env.MODE

export const IS_LOCAL_CHAIN = MODE === 'LOCAL_CHAIN'

export const LOCAL = {
    id: SupportedChainId.LOCAL,
    name: 'Local Chain',
    network: 'Local Chain',
    iconUrl: ImageOptimism,
    nativeCurrency: {
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: 'http://localhost:8545',
    },
    // Note: This will work for contracts and existing addresses, but transaction verifications on local chain will not be reflected on etherscan live data.
    blockExplorers: {
        default: {
            name: 'EtherScan',
            url: 'https://optimistic.etherscan.io/',
        },
    },
    testnet: true,
}

// Note Perp is not currently available on any testnet
// Local chain testing is used for testing contract interactions but data fetched from live subgraphs
export const OPTIMISM_CHAIN = IS_LOCAL_CHAIN ? LOCAL : chain.optimism
export const Mainnet_CHAIN = IS_LOCAL_CHAIN ? LOCAL : chain.mainnet
export const GOERLI_CHAIN = IS_LOCAL_CHAIN ? LOCAL : chain.goerli

export const USDC_ADDRESS = {
    [SupportedChainId.LOCAL]: {
        contract: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        contract: '',
    },
    [SupportedChainId.OPTIMISM]: {
        contract: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    },
}

export const VAULT_CONTRACT = {
    [SupportedChainId.LOCAL]: {
        contract: '0xAD7b4C162707E0B2b5f6fdDbD3f8538A5fbA0d60',
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        contract: '',
    },
    [SupportedChainId.OPTIMISM]: {
        contract: '0xAD7b4C162707E0B2b5f6fdDbD3f8538A5fbA0d60',
    },
}

export const DELEGATE_CONTRACT = {
    [SupportedChainId.LOCAL]: {
        contract: '0xfd7bB5F6844a43c5469c972640Eddfa99597a547',
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        contract: '',
    },
    [SupportedChainId.OPTIMISM]: {
        contract: '0xfd7bB5F6844a43c5469c972640Eddfa99597a547',
    },
}

export const CLEARING_HOUSE_CONTRACT = {
    [SupportedChainId.LOCAL]: {
        contract: '0x82ac2CE43e33683c58BE4cDc40975E73aA50f459',
    },
    [SupportedChainId.OPTIMISM_GOERLI]: {
        contract: '',
    },
    [SupportedChainId.OPTIMISM]: {
        contract: '0x82ac2CE43e33683c58BE4cDc40975E73aA50f459',
    },
}

export const OP_POOL_ID = '0x1d751bc1a723accf1942122ca9aa82d49d08d2ae'

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const PERP_REWARDS_LINK = 'https://rewards.perp.com/'

export const LOWER_TICK_COLOR = '#FF9433'
export const UPPER_TICK_COLOR = '#F1DC00'
export const LIQUIDATION_CONSTANT = 0.9375
export const MAX_LEVERAGE = 10

export const VolatilityResolutions = {
    Hourly: 1,
    Daily: HOURS_IN_A_DAY,
    Weekly: DAYS_IN_A_WEEK * HOURS_IN_A_DAY,
    Monthly: DAYS_IN_A_MONTH * HOURS_IN_A_DAY,
    Yearly: DAYS_IN_A_YEAR * HOURS_IN_A_DAY,
}
