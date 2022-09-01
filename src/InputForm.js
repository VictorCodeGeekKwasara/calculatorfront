import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getProvider } from './utils/getProvider';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';

const programID = new PublicKey(idl.metadata.address);

const InputForm = ({ calculator }) => {
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState(0);

	const styles = {
		myform: {
			'& > :not(style)': { m: 1, width: '25ch' },
			width: '100vw',
			height: '100vh',
			display: 'flex',

			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			// backgroundColor: 'red',
		},
    buttons:{
      m:1,
      backgroundColor:"#1B1B1E"
    },

		txt: {
    },
	};

	const readInput = (e) => {
		const { value } = e.target;
		setValue(value);
	};

	const handleCalcEvents = async (operation) => {
		let val = new anchor.BN(value);
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);
			let tx = await program.rpc[operation](val, {
				accounts: {
					calculator: calculator.publicKey,
				},
			});

			if (tx) {
				setValue('');
				const account = await program.account.calculator.fetch(
					calculator.publicKey
				);
				setAnswer(account.value);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleReset = async (operation) => {
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);
			let tx = await program.rpc.reset({
				accounts: {
					calculator: calculator.publicKey,
				},
			});

			if (tx) {
				setValue('');
				const account = await program.account.calculator.fetch(
					calculator.publicKey
				);
				setAnswer(account.value);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			onSubmit={(e) => {
				e.preventDefault();
			}}
			component='form'
			sx={styles.myform}
			noValidate
			autoComplete='off'
		>
			<Typography sx={styles.txt}  variant='h4' gutterBottom>
				Value = Value Operator Input
			</Typography>
			<label>
				<Typography variant='h6'> Value: </Typography>
				<TextField type='text' placeholder='' value={answer} />
			</label>
			<Box>
				<Button
					onClick={() => {
						handleCalcEvents('sum');
					}}
					sx={styles.buttons}
					variant='contained'
					mr='1'
					startIcon={<AddIcon />}
				>
					add
				</Button>
				<Button
					onClick={() => {
						handleCalcEvents('subtract');
					}}
					sx={styles.buttons}
					variant='contained'
					mr='1'
					startIcon={<RemoveIcon />}
				>
					subtract
				</Button>
				<Button
					onClick={() => {
						handleCalcEvents('multiply');
					}}
					sx={styles.buttons}
					variant='contained'
					mr='1'
					startIcon={<CloseIcon />}
				>
					multiply
				</Button>
				<Button
					onClick={() => {
						handleCalcEvents('divide');
					}}
					sx={styles.buttons}
					variant='contained'
					mr='1'
				>
					divide
				</Button>
				<Button
					onClick={handleReset}
					variant='contained'
					sx={styles.buttons}
					startIcon={<DeleteIcon />}
				>
					reset
				</Button>
			</Box>
			<label>
				<Typography variant='h6'> Input: </Typography>
				<TextField
					type='text'
					placeholder=''
					value={value}
					onChange={readInput}
				/>
			</label>
		</Box>
	);
};

export default InputForm;
