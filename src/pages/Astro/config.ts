import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
	prime: {
		1: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
		4: '0x125717E578d9B2540A129e8A710AB36623f2EDbb',
	},
	ordinary: {
		1: '0x99375cC933B9A9bbcE4C9F752Ff197461851fbC1',
		4: '0x99375cC933B9A9bbcE4C9F752Ff197461851fbC1',
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