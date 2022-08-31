export const onLoad = async ()  => {
  try {   
  let {solana} = window ;
  if(solana){
     if(solana.isPhantom){      
      let response =  await solana.connect({onlyIfTrusted: true});
      console.log('response: ' + response);
      return "Success"
     }     
    }
  }catch(err){
      console.log(err);
      return 'Failure';
  }
}

export const userConnected = async () => {
  try {
		let { solana } = window;
		if (solana) {
			if (solana.isPhantom) {
				let response = await solana.connect();
				console.log('response: ' + response);
				return 'Success';
			}
		}
	} catch (err) {
		console.log(err);
		return 'Failure';
	}

}