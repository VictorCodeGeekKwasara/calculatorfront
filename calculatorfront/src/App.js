import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { onLoad } from './utils/getConnection.js';
import Connect from './Connect';
import Initialize from './Initialize';
import InputForm from './InputForm';

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

	return loggedIn ? (initialized ?(
    <InputForm/>
  ):<Initialize init={setInitialized} />) : <Connect chngStatus={changeStatus} />;
}

export default App;
