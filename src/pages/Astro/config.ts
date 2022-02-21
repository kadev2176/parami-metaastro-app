import { config } from 'dotenv';
config();
export const defaultChainId = 4;

const INFURA_KEY = '4bf032f2d38a4ed6bb975b80d6340847';//process.env.REACT_APP_INFURA_KEY
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;

if (typeof INFURA_KEY === 'undefined') {
    throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

export const contractAddresses = {
    ad3: {
        1: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
        4: '0x76B61Ae8F964F5CBE23ad9aea9BF597aa4cEA7eD',
    },
    astro: {
        1: '0x441973ac50a9465325e50ea0ba288f395f2dc839',
        4: '0x441973ac50a9465325e50ea0ba288f395f2dc839',
    }
}