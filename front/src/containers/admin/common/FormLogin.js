import React from "react";

export default function FormLogin(props) {
  return (
    <div>
      <form onChange={props.updateForm}>
        <div className="form-group">
          <label for="exampleInputEmail1">Login</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Login"
            onChange={ props.onChangeLogin }
          />
          <small id="emailHelp" className="form-text text-muted">
           Nous ne partagerons jamais votre email
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Mot de passe"
            onChange={ props.onChangePassword }
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={ props.onClick }>
         Envoyer
        </button>
      </form>
    </div>
  );
}
