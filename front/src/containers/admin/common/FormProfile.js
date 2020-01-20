import React from "react";
import { connect } from 'react-redux'

function FormProfile(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Login</label>
          <input
            name='user_login'
            onChange={ props.onChange }
            type="login"
            className="form-control text-center"
            id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder={props.userValue_login}
            value={ props.userValue_login }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            name='user_email'
            onChange={ props.onChange }
            type="email"
            className="form-control text-center"
            id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder={props.userValue_email}
            value={ props.userValue_email }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            name='user_password'
            onChange={ props.onChange }
            type="password"
            className="form-control text-center"
            id="exampleInputPassword1"
            placeholder=''
            // value={''}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirmation mot de passe</label>
          <input            
            name='user_passwordBis'
            onChange={ props.onChange }
            type="password"
            className="form-control text-center"
            id="exampleInputPassword1"
            placeholder={props.userValue_passwordBis}
            value={ props.userValue_passwordBis }
          />
        </div>
        <button type="submit" className="btn btn-primary">
         Modifier
        </button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  // console.log(state)
  return { token: state.auth.token, user: state.auth.email };
}

export default connect(mapStateToProps)(FormProfile);
