import {Provider} from '@project-serum/anchor';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const network = clusterApiUrl('devnet');

const opts = {
	preflightCommitment: 'processed',
};
export const getProvider = () => {  
	const connection = new Connection(network, opts.preflightCommitment);
	const provider = new Provider(
		connection,
		window.solana,
		opts.preflightCommitment
	);
	return provider;
};
