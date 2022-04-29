import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
    mint: {
        1: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
        4: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
    },
    breed: {
        1: '0x0d45918e1f0d72bc2075c964C28d950E2Ff7f45c',
        4: '0x0d45918e1f0d72bc2075c964C28d950E2Ff7f45c',
    },
}

export const opensea = {
    url: 'https://testnets.opensea.io',
    collection: 'meta-astro-1fxisntgxd',
}

export const oddMonth = {
    1: 'Jan',
    3: 'Mar',
    5: 'May',
    7: 'Jul',
    8: 'Aug',
    10: 'Oct',
    12: 'Dec'
};