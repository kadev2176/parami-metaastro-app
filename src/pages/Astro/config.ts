import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
    ad3: {
        1: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
        4: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
    },
    mint: {
        1: '0x9AFe9B34436FDaE2CB0043A7EbfC678611c106D3',
        4: '0x9AFe9B34436FDaE2CB0043A7EbfC678611c106D3',
    },
    breed: {
        1: '0x648C55b1e50F06A17e87c2D6782b76613F244020',
        4: '0x648C55b1e50F06A17e87c2D6782b76613F244020',
    },
}

export const opensea = {
    url: 'https://testnets.opensea.io',
    collection: 'meta-astro-9e06gd9hvs',
}