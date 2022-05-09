import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
	prime: {
		1: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
		4: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
	},
	ordinary: {
		1: '0xc15E4D2fb17B6874437647FDF79DC218a0eAeA8F',
		4: '0xc15E4D2fb17B6874437647FDF79DC218a0eAeA8F',
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