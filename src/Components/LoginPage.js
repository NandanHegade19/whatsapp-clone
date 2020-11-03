import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import '../Styles/LoginPage.css';


function LoginPage() {

    const [state, dispatch] = useStateValue();

    const signin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => alert(error.message))
    }

    return (
        <div className = "loginpage">
            <div className = "loginpage__container">
                <img src = "https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png" alt = "whatsapp logo"/>
                <div className = "loginpage__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type = "submit" onClick = {signin}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default LoginPage;