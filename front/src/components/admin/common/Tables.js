import React from "react";
import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/Tables.css";
import ButtonDelete from "./ButtonDelete";
import ButtonModify from "./ButtonModify";
import ButtonSee from "./ButtonSee";

const Tables = props => {

  const handleSort = (e) => {
    let order = '';
    if (e.target.classList.contains('asc')) {
      order = 'asc'
      e.target.classList.add("desc")
      e.target.classList.remove("asc")
    }
    else {
      order = 'desc'
      e.target.classList.add("asc")
      e.target.classList.remove("desc")
    }
    props.orderBy(e.target.id, order, props.page)
  }

  const handleDelete = (id) => {
    props.deleteData(props.page, id)
  }


  return (
    <div id={props.page}>
      <div className="table-responsive">
        <table
          className="table table-bordered text-center "
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            {props.page === "order" ? (
              <tr>
                <th className="th-order pink bg-lightpink asc" id="order_ref" onClick={handleSort}> Ref </th>
                <th className="th-order pink bg-lightpink asc" id="order_name" onClick={handleSort}> Client </th>
                <th className="th-order pink bg-lightpink asc" id="order_date" onClick={handleSort}>
                  {" "}
                  Date de commande{" "}
                </th>
                <th className="th-order pink bg-lightpink asc" id="order_status" onClick={handleSort}> Status </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "products" ? (
              <tr>
                <th className="th-order pink bg-lightblue blue asc" id="product_name" onClick={handleSort}> Désignation</th>
                <th className="pink bg-lightblue blue asc" id="product_image_id" onClick={handleSort}> Image Produit </th>
                <th className="th-order pink bg-lightblue blue desc" id="product_price" onClick={handleSort}> Prix </th>
                <th className="pink bg-lightblue blue asc" id="product_description" onClick={handleSort}> Description </th>
                <th className="pink bg-lightblue blue asc" id="collection_name" onClick={handleSort}> Collection </th>
                <th className="pink bg-lightblue blue asc" id="category_name" onClick={handleSort}> Catégorie </th>
                <th className="pink bg-lightblue blue desc" id="product_stock" onClick={handleSort}> Stock </th>
                <th className="gray bg-lightblue blue">
                  <strong className="blue"> Action </strong>
                </th>
              </tr>
            ) : props.page === "categories" ? (
              <tr>
                <th className="th-order pink bg-lightblue blue asc " id="category_name" onClick={handleSort}> Désignation </th>
                <th className="th-order pink bg-lightblue blue desc" id="nb_items" onClick={handleSort}> Nombre de références </th>
                <th className=" bg-lightblue blue">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "collections" ? (
              <tr>
                <th className="th-order pink bg-lightpink asc" id="collection_name" onClick={handleSort}> Nom de la collection </th>
                <th className="th-order pink bg-lightpink asc" id="collection_cover_image_url" onClick={handleSort}> Image de couverture </th>
                {/* <th className="th-order pink bg-lightpink asc" id="collection_image_id" onClick={handleSort}> Image de la collection </th> */}
                <th className="th-order pink bg-lightpink desc" id="nb_items" onClick={handleSort}> Nombre de références </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "promo" ? (
              <tr>
                <th className="th-order pink bg-lightpink asc" id="promo_name" onClick={handleSort}> Nom de la promo </th>
                <th className="th-order pink bg-lightpink desc" id="promo_value" onClick={handleSort}> Réduction </th>
                <th className="th-order pink bg-lightpink desc" id="promo_sticker" onClick={handleSort}> Sticker </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "code-promo" ? (
              <tr>
                <th className="th-order pink bg-lightpink asc" id="code_promo_name" onClick={handleSort}> Nom du code promo </th>
                <th className="th-order pink bg-lightpink desc" id="code_promo_value" onClick={handleSort}> Réduction </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "users" ? (
              <tr>
                <th className="th-order pink bg-lightpink asc" id="user_lastname" onClick={handleSort}> Nom</th>
                <th className="th-order pink bg-lightpink asc" id="user_firstname" onClick={handleSort}> Prénom </th>
                <th className="th-order pink bg-lightpink asc" id="user_email" onClick={handleSort}> Email </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : (
                            <></>
                          )}
          </thead>

          <tbody>


            {props.donnees &&
              props.donnees.map((data, i) => {
                switch (props.page) {
                  case "order":
                    const order_date = new Date(data.order_date);
                    const shipped_date = new Date(data.order_shipped_date);
                    return (
                      <tr key={data.order_id}>
                        <td>
                          {" "}
                          <p>{data.order_ref}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{data.user_firstname} {data.user_lastname}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{order_date.toLocaleDateString()}</p>
                        </td>
                        <td>
                          <p>{data.order_status_name}</p>
                        </td>

                        <td className='actionButtons'>
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonModify index={i} onClick={props.onClick} />
                        </td>
                      </tr>
                    );
                  case "products":
                    return (
                      <tr key={data.product_id} >
                        <td>
                          {" "}
                          <p>{data.product_name} </p>
                        </td>
                        <td>
                         
                          <p><img src={data.image_name} alt="image de couverture" width="80" height="100" /><br />{data.image_name}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{data.product_price}</p>
                        </td>
                        <td>
                          <p>{data.product_description}</p>
                        </td>
                        <td>
                          <p>{data.collection_name}</p>
                        </td>
                        <td>
                          <p>{data.category_name}</p>
                        </td>
                        <td>
                          <p className={data.product_stock <= data.product_stock_min ? "badge badge-pill bg-pink lightpink " : null} >{data.product_stock}</p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonModify index={i} onClick={props.onClick} />
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.product_id} />
                        </td>
                      </tr>
                    );
                  case "collections":
                    return (
                      <tr key={data.collection_id}>
                        <td>
                          {" "}
                          <p>{data.collection_name}</p>
                        </td>
                        <td>
                          {" "}
                          <p><img src={data.image_name} alt="aucune image de couverture" width="80" height="80" /><br />{data.collection_cover_image_url}</p>
                        </td>
                        <td>
                          <p>{data.nb_items}</p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonModify index={i} onClick={props.onClick} />
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.collection_id} />
                        </td>
                      </tr>
                    );
                  case "categories":
                    return (
                      <tr key={data.category_id}>
                        <td>
                          {" "}
                          <p>{data.category_name}</p>
                        </td>
                        <td>
                          <p>{data.nb_items}</p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonModify index={i} onClick={props.onClick} />
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.category_id} />
                        </td>
                      </tr>
                    );
                  case "users":
                    return (
                      <tr key={data.user_id}>
                        <td>
                          {" "}
                          <p>{data.user_lastname}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{data.user_firstname}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{data.user_email}</p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.user_id} />
                        </td>
                      </tr>
                    );
                  case "promo":
                    return (
                      <tr key={data.promo_id}>
                        <td>
                          {" "}
                          <p>{data.promo_name}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{data.promo_value}</p>
                        </td>
                        <td>
                          {" "}
                          <p>
                            { data.promo_sticker_text != 'NULL' ?
                            <b className={`sticker-promo`} style={{backgroundColor:data.promo_sticker_color}}>{data.promo_sticker_text}</b>
                            :
                            'pas de sticker'  
                            }
                            
                            </p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonModify index={i} onClick={props.onClick} />
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.promo_id} />
                        </td>
                      </tr>
                    );
                  case "code-promo":
                    return (
                      <tr key={data.code_promo_id}>
                        <td>
                          {" "}
                          <p>{data.code_promo_name}</p>
                        </td>
                        <td>
                          <p>{data.code_promo_value}</p>
                        </td>
                        <td className='actionButtons'>
                          <ButtonModify index={i} onClick={props.onClick} />
                          <ButtonSee index={i} onClickSee={props.onClickSee} />
                          <ButtonDelete deleteData={handleDelete} id={data.code_promo_id} />
                        </td>
                      </tr>
                    );

                  default:
                    break;
                }
                return null
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
