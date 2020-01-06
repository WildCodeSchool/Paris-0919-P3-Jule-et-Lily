import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../../assets/css/admin/global.css";
import "../../../assets/css/admin/Tables.css";
import ButtonDelete from './ButtonDelete';
import ButtonAdd from './ButtonAdd';
import ButtonModify from './ButtonModify';
import ButtonSee from './ButtonSee';

const Tables = (props) => {

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
            {/* {console.log('datas2', datas)} */}

            {props.donnees.data && props.donnees.data.map(data => {
              return (
                <tr>
                  <td> <p>{data.product_id}</p></td>
                  <td> <p>{data.product_name}</p></td>
                  <td> <p>{data.product_price}</p></td>
                  <td><p>{data.product_description}</p></td>
                  <td>
                    <ButtonModify cliquer={props.cliquer}/>
                    <ButtonSee />
                    <ButtonDelete />
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Tables;