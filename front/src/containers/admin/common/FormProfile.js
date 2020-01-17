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
            type="login"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={props.user_login}
            value={ props.userValue_login }
            onChange={ props.onChange }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            name='user_email'
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={props.user_email}
            value={ props.userValue_email }
            onChange={ props.onChange }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            name='user_password'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder='*******'
            value={ props.userValue_password }
            onChange={ props.onChange }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirmation mot de passe</label>
          <input            
            name='user_passwordBis'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder={props.user_passwordBis}
            value={ props.userValue_passwordBis }
            onChange={ props.onChange }
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
