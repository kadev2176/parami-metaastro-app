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
    mint: {
        1: '0x29175F171C104Af23E3bC66e3ECC5Ddf91F850f0',
        4: '0x29175F171C104Af23E3bC66e3ECC5Ddf91F850f0',
    },
    breed: {
        1: '0xcf4b44c1F138AE365b6Ac40f5CB84De3aD2acC4a',
        4: '0xcf4b44c1F138AE365b6Ac40f5CB84De3aD2acC4a',
    },
}