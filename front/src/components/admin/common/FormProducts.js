import React from "react";
import ButtonConfirm from './ButtonConfirm'
import ButtonCancel from './ButtonCancel'
import Encarts from './Encarts'
export default function FormProducts(props) {
  return (
    <>

      <Encarts title="Fiche Produit">
        
        
        {props.donneesProducts && props.donneesProducts.map(data => {
          {console.log('log de donnes products',props.donneesProducts)}
          return (
            <form>
              <div className="form-group">
                <label for="designation"> Désignation</label>
                <input
                  type="text"
                  class="form-control"
                  id="designationid"
                  placeholder={data.product_name}
                  
                />
              </div>
             

              <div className="form-group">
                <label for="prix">Prix</label>
                <input
                  type="text"
                  class="form-control"
                  id="examprixid"
                  placeholder={data.product_price}
                />
              </div>

              <div className="form-group">
                <label for="Description">Description</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder={data.product_description}
                />
              </div>

              <div className="input-group">
                <select className="custom-select" id="inputGroupSelect01">
                  <option selected>Catégorie : {data.category_name}</option>
                  <option value="1">{data.category_name}</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div className="input-group mt-4">
                <select className="custom-select" id="inputGroupSelect02">
                  <option selected>Collection ...</option>
                  <option value="1">{data.collection_name}</option>
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

              <ButtonCancel onClick={props.onClick} color='#234eb7' />
              <ButtonConfirm color='#234eb7' />

            </form>

          )
        })}
      </Encarts>

    </>

  );
}
