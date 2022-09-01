import React,{useState} from 'react';
import { getProvider } from './utils/getProvider';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { Program} from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';

const programID = new PublicKey(idl.metadata.address);

const InputForm = ({calculator}) => {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(0);
  const readInput = (e) => {
    const {value} = e.target;
    setValue(value)

  }

  const handleCalcEvents = async (operation) => {
    let val = new anchor.BN(value);
    try {
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		let tx = await program.rpc[operation](val,{
       accounts: {
				calculator: calculator.publicKey,				
			 },
       });			

       if(tx){
        setValue("");
        const account = await program.account.calculator.fetch(calculator.publicKey);
        setAnswer(account.value)
       }
		
	  } catch (err) {
		console.log(err);
	}
  }
  const handleReset = async (operation) => {
    
    try {
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		let tx = await program.rpc.reset({
       accounts: {
				calculator: calculator.publicKey,				
			 },
       });			

       if(tx){
        setValue("");
        const account = await program.account.calculator.fetch(calculator.publicKey);
        setAnswer(account.value)
       }
		
	  } catch (err) {
		console.log(err);
	}
  }  
  
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input type='text' placeholder='' value={value} onChange={readInput} />
			<label>
				Answer: <input type='text' placeholder='' value={answer} />
			</label>
			<button
				onClick={() => {
					handleCalcEvents('sum');
				}}
			>
				add
			</button>
			<button
				onClick={() => {
					handleCalcEvents('subtract');
				}}
			>
				subtract
			</button>
			<button
				onClick={() => {
					handleCalcEvents('multiply');
				}}
			>
				multiply
			</button>
			<button
				onClick={() => {
					handleCalcEvents('divide');
				}}
			>
				divide
			</button>
			<button onClick={handleReset}>reset</button>
		</form>
	);

};

export default InputForm;
