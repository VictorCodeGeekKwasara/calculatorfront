import React from 'react';
import { getProvider } from './utils/getProvider';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';

const { SystemProgram} = web3;
const programID = new PublicKey(idl.metadata.address);

const Initialize = ({init,calculator}) => {
const createAccount = async () => {
	try {
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		let tx = await program.rpc.initialize({
       accounts: {
				calculator: calculator.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			   },
       signers: [calculator],
       });			

       if(tx){
          init(true)
       }
		
	  } catch (err) {
		console.log(err);
	}
};
	return <button onClick={createAccount}>Initialize</button>;
};

export default Initialize;
