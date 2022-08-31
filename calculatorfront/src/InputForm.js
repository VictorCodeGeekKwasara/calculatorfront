import React,{useState} from 'react';
import { getProvider } from './utils/getProvider';
import idl from './idl.json';
import { PublicKey } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import kp from './keypair.json';


const programID = new PublicKey(idl.metadata.address);
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const calculator = web3.Keypair.fromSecretKey(secret);

const InputForm = () => {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(0);
  const readInput = (e) => {
    const {value} = e.target;
    setValue(value)

  }

  const handleAdd = async () => {
    let val = new anchor.BN(value);
    try {
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		let tx = await program.rpc.sum(val,{
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
		<form onSubmit={(e) => {e.preventDefault();}}>
			<input type="text" placeholder='' value={value} onChange={readInput} />
			<label>Answer: <input type="text" placeholder='' value={answer} /></label>
      <button  onClick={handleAdd}>
        Add
      </button>
      <button>
        subtract
      </button>
      <button>
        Divide
      </button>
      <button>
        Multiply
      </button>
		</form>
	);

};

export default InputForm;
