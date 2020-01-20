import React, {useState, useEffect} from "react";
import { connect } from  'react-redux';
import FormLogin from '../common/FormLogin'

function Login(props) {
    const [user, setUser] = useState({ user_password: null,
                                       user_login: null, 
                                       error: false, 
                                       token: '', 
                                       flash: props.flash  })
    
    useEffect(() => {
        if(props.authenticated === true) {
            props.history.replace('/');
          }
      }, []);

    // const updateLoginField = (e) => {
    //     setUser({...user, user_login: e.target.value })
    // }

    // const updatePasswordField = (e) => {
    //     setUser({...user, user_password: e.target.value })
    // }

    const updateForm = (e) => {
        const  inputLogin= document.getElementById('exampleInputEmail1');
        const inputPassword= document.getElementById('exampleInputPassword1');
        setUser({...user, user_login: inputLogin.value, user_password: inputPassword.value})
    }

    const handleSubmit = (e) => {       
        fetch("/auth",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(
                res => (setUser({ error: res.error, flash: res.flash }),
                props.dispatch(
                    {
                        type : "CREATE_SESSION",
                        user: res.user,
                        token : res.token,
                        flash : res.flash
                    }
                )),
                err => setUser({ error: err.error, flash: err.flash })
            );
        e.preventDefault()
        console.log(user)
    }


    return (
        <div className='m-5'>
            <h1>Connecte-toi</h1>
            {user.flash ? (alert(user.flash), setUser({...user, flash: null})) : ''}
            <div>
                <FormLogin 
                    // onChangeLogin={ updateLoginField }
                    // onChangePassword={ updatePasswordField }
                    updateForm= { updateForm }
                    onClick={ handleSubmit } />
            </div>
        </div>
    )
}


const  mapStateToProps = (state) => {
    return {
        flash:  state.auth.token,
    }
};


export  default  connect(mapStateToProps)(Login)