import React, { useState } from "react";

import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/Tables.css";
import ButtonDelete from './ButtonDelete';
import ButtonAdd from './ButtonAdd';
import ButtonModify from './ButtonModify';
import ButtonSee from './ButtonSee';

const Tables = (props) => {
  const [commandes, setCommandes] = useState();

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
            <tr>
              <th className="th-order pink bg-lightpink "> Id </th>
              <th className="th-order pink bg-lightpink "> Nom </th>
              <th className="th-order pink bg-lightpink "> Prix </th>
              <th className="pink bg-lightpink"> Description </th>
              {/* <th className="pink bg-lightpink">Statut</th> */}
              <th className="gray bg-lightpink">
                <strong>Action </strong>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> <p>{props.data.product_id}</p></td>
              {/* {props.numberOrder} */}
              <td> <p>{props.data.product_name}</p></td>
              {/* {props.name}  */}
              <td> <p>{props.data.product_price}</p></td>
              {/* {props.date}  */}
              <td><p>{props.data.product_description}</p></td>
              {/* {props.price} */}
              {/* <td>En cours</td> */}
              {/* {props.status} */}
              <td>
                <ButtonModify />
                <ButtonSee />
                <ButtonDelete />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
