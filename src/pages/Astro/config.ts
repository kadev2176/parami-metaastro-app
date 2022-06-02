import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
	prime: {
		1: '0xd4D58De43422790281Cc26Dd81c6532b676FD790',
		4: '0xd4D58De43422790281Cc26Dd81c6532b676FD790',
	},
	ordinary: {
		1: '0x84a0C386c9FA887F4D50AcE7b951caB1A9E0232F',
		4: '0x84a0C386c9FA887F4D50AcE7b951caB1A9E0232F',
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