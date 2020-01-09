import React from "react";

export default function Form() {
  return (
    <div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Adresse email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
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
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
           Coche moi !
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
         Envoyer
        </button>
      </form>
    </div>
  );
}
