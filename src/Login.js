import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from "./Firebase"
import { useStateValue } from "./StateProvider"; 
import "./login.css"

function Login() {

	const [state,dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider)
		.then((result) => {
			console.log(result);
			
			dispatch({
				type:"SET_USER",
				payload: result.user,
			})
		})
		.catch((err) => console.log(err));
	}
	return (
		
		<div className="login">
			<div className="login__container">
			<img src="https://img.icons8.com/color/144/000000/whatsapp--v1.png" alt=""/>
				<div className="login__text">
					<h1>Sign in to whatsapp</h1>
				</div>
				<Button type="submit" onClick={signIn}>
					Sign In with Google
				</Button>
			
			</div>
		</div>
	)
}

export default Login
