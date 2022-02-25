import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
    ad3: {
        1: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
        4: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
    },
    mint: {
        1: '0x37cDf677D625078F5D59A0715aB80F0D215B29ED',
        4: '0x37cDf677D625078F5D59A0715aB80F0D215B29ED',
    },
    breed: {
        1: '0x2aF322725Ec31356C76a9C6804bE80A2BD1CCB89',
        4: '0x2aF322725Ec31356C76a9C6804bE80A2BD1CCB89',
    },
}