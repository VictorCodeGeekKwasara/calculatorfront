import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getProvider } from './utils/getProvider';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';

const { SystemProgram} = web3;
const programID = new PublicKey(idl.metadata.address);

const Initialize = ({init,calculator}) => {

const styles = {
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		width: '100vw',
	},
};
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
	return (
		<Box sx={styles.box}>
			<Button variant='contained' onClick={createAccount}>
				Initialize
			</Button>
		</Box>
	);
};

export default Initialize;
