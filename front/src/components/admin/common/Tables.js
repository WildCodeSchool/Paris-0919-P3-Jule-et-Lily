import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/Tables.css";
import ButtonDelete from "./ButtonDelete";
import ButtonAdd from "./ButtonAdd";
import ButtonModify from "./ButtonModify";
import ButtonSee from "./ButtonSee";

const Tables = props => {
  // const [commandes, setCommandes] = useState();
  // const [datas, setData] = useState([]);

  // const fetchData = () => {

  //   axios.get('/product/all')
  //     //  .then(res => console.log(res.data[0]))
  //     .then(res => setData({ datas: res.data }));
  //   console.log('datas', datas);
  //   ;

  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <div>
      <div className="table-responsive">
        <table
          className="table table-bordered text-center "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            {props.page === "order" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Ref </th>
                <th className="th-order pink bg-lightpink ">
                  {" "}
                  Date de commande{" "}
                </th>
                <th className="pink bg-lightpink"> Status </th>
                <th className="th-order pink bg-lightpink "> Date d'envoi </th>
                <th className="th-order pink bg-lightpink "> N° de suivi </th>
                <th className="th-order pink bg-lightpink "> Utitlisateur </th>
                <th className="th-order pink bg-lightpink ">
                  {" "}
                  Méthode d'envoi{" "}
                </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "products" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Désignation</th>
                <th className="th-order pink bg-lightpink "> Prix </th>
                <th className="pink bg-lightpink"> Description </th>
                <th className="pink bg-lightpink"> Collection </th>
                <th className="pink bg-lightpink"> Catégorie </th>
                <th className="pink bg-lightpink"> Stock </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "categories" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Désignation </th>
                <th className="th-order pink bg-lightpink "> Nombre de références </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "collections" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Désignation </th>
                <th className="th-order pink bg-lightpink "> Image de couverture </th>
                <th className="th-order pink bg-lightpink "> Image de la collection </th>
                <th className="th-order pink bg-lightpink "> Nombre de références </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
            ) : props.page === "promo" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Nom de la promo </th>
                <th className="th-order pink bg-lightpink "> Réduction </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr> 
              ) : props.page === "code-promo" ? (
              <tr>
                <th className="th-order pink bg-lightpink "> Nom du code promo </th>
                <th className="th-order pink bg-lightpink "> Réduction </th>
                <th className="gray bg-lightpink">
                  <strong>Action </strong>
                </th>
              </tr>
               ) : props.page === "clients" ? (
                <tr>
                  <th className="th-order pink bg-lightpink "> Nom</th>
                  <th className="th-order pink bg-lightpink "> Prénom </th>
                  <th className="th-order pink bg-lightpink "> Email </th>
                  <th className="gray bg-lightpink">
                    <strong>Action </strong>
                  </th>
                </tr>
                 ) : (
              <></>
            )}
          </thead>

          <tbody>
            {console.log("datas2", props.donnees)}

            {props.donnees.data &&
              props.donnees.data.map(data => {
                switch (props.page) {
                  case "order":
                    const order_date = new Date(data.order_date);
                    const shipped_date = new Date(data.shipped_date);
                    return (
                      <tr key={data.order_id}>
                        <td>
                          {" "}
                          <p>{data.order_ref}</p>
                        </td>
                        <td>
                          {" "}
                          <p>{order_date.toLocaleDateString()}</p>
                        </td>
                        <td>
                          <p>{data.order_status}</p>
                        </td>
                        <td>
                          <p>
                            {data.order_shipped_date != null
                              ? shipped_date.toLocaleDateString()
                              : "Envoi en attente"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {data.order_tracking_number != null
                              ? data.order_tracking_number
                              : "N/A"}
                          </p>
                        </td>
                        <td>
                          <p>{data.order_user_id}</p>
                        </td>
                        <td>
                          <p>
                            {data.order_shipping_method_id != null
                              ? data.order_shipping_method_id
                              : "N/A"}
                          </p>
                        </td>
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
                        </td>
                      </tr>
                    );
                  case "products":
                    return (
                      <tr key={data.product_id}>
                        <td>
                          {" "}
                          <p>{data.product_name}</p>
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
                          <p>{data.product_stock}</p>
                        </td>
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
                        </td>
                      </tr>
                    );
                  case "collections":
                    console.log(data);
                    return (
                      <tr key={data.collection_id}>
                        <td>
                          {" "}
                          <p>{data.collection_name}</p>
                        </td>
                        <td>
                          {" "}
                          <p><img src={data.collection_cover_image_url} alt="cover image"/></p>
                        </td>
                        <td>
                          <p><img src={data.image_url} alt="collection image" width="50" height="50"/></p>
                        </td>
                        <td>
                          <p>{data.nb_items}</p>
                        </td>
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
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
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
                        </td>
                      </tr>
                    );
                  case "clients":
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
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
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
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
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
                        <td>
                          <ButtonModify />
                          <ButtonSee />
                          <ButtonDelete />
                        </td>
                      </tr>
                    );

                  default:
                    break;
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
