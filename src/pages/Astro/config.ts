import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
    ad3: {
        1: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
        4: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
    },
    mint: {
        1: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
        4: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
    },
    breed: {
        1: '0xf8dC9727F560982e2b89b188353a9498eed93F56',
        4: '0xf8dC9727F560982e2b89b188353a9498eed93F56',
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