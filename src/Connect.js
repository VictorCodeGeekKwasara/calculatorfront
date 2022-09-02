import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { userConnected } from "./utils/getConnection.js";

const Connect = ({ chngStatus }) => {
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

  const updateStatus = async () => {
    let result= await userConnected();
    console.log(result)
    if (result == 'Success') {
			chngStatus();
		}    
  }
	return (
		<Box sx={styles.box}>
			<Typography variant='h6'>Phantom Wallet.</Typography>
			<Button variant='contained' mr={1} onClick={updateStatus}>
				Connect
			</Button>
		</Box>
	);
};

export default Connect