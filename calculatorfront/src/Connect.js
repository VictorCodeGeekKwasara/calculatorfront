import React from 'react'
import { userConnected } from "./utils/getConnection.js";

const Connect = ({ chngStatus }) => {

  const updateStatus = async () => {
    let result= await userConnected();
    console.log(result)
    if (result == 'Success') {
			chngStatus();
		}    
  }
	return <button onClick={updateStatus}>Connect</button>;
};

export default Connect