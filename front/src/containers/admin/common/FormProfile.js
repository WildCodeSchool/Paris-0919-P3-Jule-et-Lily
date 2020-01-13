import React from "react";

function FormProfile(props) {
  return (
    <div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Login</label>
          <input
            type="login"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={ props.user_login }
            // onChange={ props.onChangeLogin }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Login"
            value={ props.user_email }
            // onChange={ props.onChangeLogin }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Mot de passe"
            value={ props.user_password }
            // onChange={ props.onChangePassword }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirmation mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Mot de passe"
            // onChange={ props.onChangePassword }
          />
        </div>
        <button type="submit" className="btn btn-primary" //onClick={ props.onClick }
        >
         Modifier
        </button>
      </form>
    </div>
  );
}

export default FormProfile