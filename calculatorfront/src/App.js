import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { onLoad } from './utils/getConnection.js';
import Connect from './Connect';
import Initialize from './Initialize';
import InputForm from './InputForm';
import { web3 } from '@project-serum/anchor';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [calculator,setCalculator] = useState(null);

	const changeStatus = () => {
		setLoggedIn(!loggedIn);
	};

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
	
			let kp = web3.Keypair.generate()
			setCalculator(kp)

	},[loggedIn])

	return loggedIn ? (
		initialized ? (
			<InputForm calculator={calculator} />
		) : (
			<Initialize init={setInitialized} calculator={calculator} />
		)
	) : (
		<Connect chngStatus={changeStatus} />
	);
}

export default App;
