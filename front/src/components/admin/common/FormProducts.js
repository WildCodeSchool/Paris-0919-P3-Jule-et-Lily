import React, { useState } from "react";
import ButtonConfirm from './ButtonConfirm'
import ButtonCancel from './ButtonCancel'
import Encarts from './Encarts'
export default function FormProducts(props) {
  const data = props.donneesProducts
  const [productModify, setProductModify] = useState(props.donneesProducts)


  const validateNewData = (e) => {

    setProductModify({ ...productModify, [e.target.name]: e.target.value })

    // else if ...

  }
  // fetch ds un hooks pour maper les noms des catégories etc ...

  return (
    <>

      <Encarts title="Modifier la fiche Produit">
        <form>
          <div className="form-group">
            <label for="designation"> Désignation</label>
            <input
              name='product_name'
              onChange={validateNewData}
              type="text"
              class="form-control"
              id="designationid"
              placeholder={productModify.product_name}
              value={productModify.product_name}

            />
          </div>


          <div className="form-group">
            <label for="prix">Prix</label>
            <input
              onChange={validateNewData}
              type="text"
              class="form-control"
              id="examprixid"
              name='product_price'
              placeholder={productModify.product_price}
              value={productModify.product_price}
            />
          </div>

          <div className="form-group">
            <label for="Description">Description</label>
            <textarea onChange={validateNewData}
              name='product_description'
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              value={productModify.product_description}
              placeholder={productModify.product_description}
            />
          </div>

          <div className="input-group">
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>{productModify.category_name}</option>
              <option value="1">{productModify.category_name}</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="input-group mt-4">
            <select className="custom-select" id="inputGroupSelect02">

              <option value="1">{productModify.collection_name}</option>
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
              placeholder={productModify.product_image_id}
            />
          </div>

          <ButtonCancel onClick={props.onClick} color='#234eb7' />
          <ButtonConfirm color='#234eb7' />

        </form>

      </Encarts>

    </>

  );
}
