import React, {useState, useEffect} from "react";
import { FormLogin } from "../common/";

export default function Login() {
    const [user, setUser] = useState({ user_password: null, user_login: null, error: false, message: null })
    

    const updateLoginField = (e) => {
        setUser({...user, user_login: e.target.value })
    }

    const updatePasswordField = (e) => {
        setUser({...user, user_password: e.target.value })
    }

    const handleSubmit = (e) => {
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
                res => (setUser({ error: res.error, message: res.flash})),
                err => setUser({ error: err.error, message: err.flash })
            );
        e.preventDefault()
    }


    return (
        <div className='m-5'>
            <h1>Connecte-toi</h1>
            {user.message ? (alert(user.message), setUser({...user, message: null})) : ''}
            <div>
                <FormLogin 
                    onChangeLogin={ updateLoginField }
                    onChangePassword={ updatePasswordField }
                    onClick={ handleSubmit } />
            </div>
        </div>
    )
}
