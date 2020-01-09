import React, {useState, useEffect} from "react";
import { FormLogin } from "../common/";
import { log } from "util";

export default function Login() {
    const [user, setUser] = useState({ user_password: null, user_login: null, error: false, flash: null, message: null })
    

    function updateLoginField(e) {
        setUser({...user, user_login: e.target.value })
        console.log(user);
        
    }
    function updatePasswordField(e) {
        setUser({...user, user_password: e.target.value })
        console.log(user);
        
    }

    function handleSubmit(e) {
        fetch("/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(
                res => console.log('pozepaozepaozpeoaze', res) ||  setUser({ error: res.error, message:'you are signed in' }),
                err => console.log('fffffffffffffffffffffffff') || setUser({ error: err.error, message: 'Login ou mot de passe incorrect' })
            );
        e.preventDefault()
        console.log({ user })
    }


    return (
        <div className='m-5'>
            <h1>Connecte-toi</h1>
            <div>
                <FormLogin 
                    onChangeLogin={ updateLoginField }
                    onChangePassword={ updatePasswordField }
                    onClick={ handleSubmit } />
            </div>
        </div>
    )
}
