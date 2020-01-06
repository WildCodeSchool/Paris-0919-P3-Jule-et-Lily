import React from "react";
import ButtonConfirm from './ButtonConfirm'
import ButtonCancel from './ButtonCancel'
import Encarts from './Encarts'
export default function FormProducts({cliquer}) {
  return (
    <div>
      <Encarts title="Fiche Produit">
        <form>
          <div className="form-group">
            <label for="designation">Désignation</label>
            <input
              type="text"
              class="form-control"
              id="designationid"
              placeholder="Designation"
            />
          </div>

          <div className="form-group">
            <label for="prix">Prix</label>
            <input
              type="text"
              class="form-control"
              id="examprixid"
              placeholder="Prix"
            />
          </div>

          <div className="form-group">
            <label for="designation">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Description ... "
            />
          </div>

          <div className="input-group">
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>Catégorie ...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="input-group mt-4">
            <select className="custom-select" id="inputGroupSelect02">
              <option selected>Collection ...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="form-group">
            <label for="image">Image</label>
            <input
              type="text"
              class="form-control"
              id="imageid"
              placeholder="Image"
            />
          </div>

          <ButtonCancel  onClick=cliquer} color='#234eb7' />
          <ButtonConfirm color='#234eb7' />
        </form>
      </Encarts>

    </div>
  );
}
