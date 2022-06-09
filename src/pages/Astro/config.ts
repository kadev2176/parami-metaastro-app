import { config } from 'dotenv';
config();
export const defaultChainId = 4;

export const contractAddresses = {
	prime: {
		1: '0x67dfcb5E9E5Ae693E9cA354a239185ACaFB842D3',
		4: '0x67dfcb5E9E5Ae693E9cA354a239185ACaFB842D3',
	},
	ordinary: {
		1: '0xc11cc94c8b3eC85b7CB4B158D7BDfAc57b97244D',
		4: '0xc11cc94c8b3eC85b7CB4B158D7BDfAc57b97244D',
	},
}

export const opensea = {
	url: 'https://testnets.opensea.io',
	collection: 'meta-astro-genesis',
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