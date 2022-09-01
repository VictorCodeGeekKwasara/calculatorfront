import React from 'react';
import logo from './logo.svg';
import './App.css';
import idl from './idl.json';
import { useState, useEffect } from 'react';
import { onLoad } from './utils/getConnection.js';
import Connect from './Connect';
import Initialize from './Initialize';
import InputForm from './InputForm';
import { getProvider } from './utils/getProvider';
import { PublicKey } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';
import kp from './keypair.json';
const programID = new PublicKey(idl.metadata.address);

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const calculator = web3.Keypair.fromSecretKey(secret);


function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [initialized, setInitialized] = useState(false);

	const changeStatus = () => {
		setLoggedIn(!loggedIn);
	};

	// console.log(window.solana);

	useEffect(() => {
		const getConnection = async () => {
			let result = await onLoad();
			if (result == 'Success') {
				setLoggedIn(true);
			}
		};
		window.addEventListener('load', getConnection());
		return window.removeEventListener('load', getConnection());
	}, []);

	useEffect(()=>{
		try{
			const provider = getProvider ()
			const program = new Program(idl, programID, provider);
			const getAccount = async () =>{ await program.account.calculator.fetch(calculator.publicKey);}
			const account = getAccount();
			console.log("Got the account", account)
			setInitialized(true)

		}catch(e){
			setInitialized(false)
			console.log("Error in getGifList: ", e)
		}

	},[loggedIn])

	return loggedIn ? (initialized ?(
    <InputForm/>
  ):<Initialize init={setInitialized} />) : <Connect chngStatus={changeStatus} />;
}

export default App;
