import React from "react";

function FormProfile(props) {
  return (
    <div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Login</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            // onChange={ props.onChangeLogin }
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="login"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Login"
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
        <div class="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
           Coche moi !
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={ props.onClick }>
         Modifier
        </button>
      </form>
    </div>
  );
}

export default FormProfile