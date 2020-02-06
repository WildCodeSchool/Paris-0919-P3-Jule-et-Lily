import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
export default function FormProducts(props) {

    const [orders, setOrder] = useState();
    const donnes = props.donneesOrder;
    const fetchOrders = () => {
        axios
            .get(`/order/${donnes.order_id}/items`)
            .then(res => {
                // modifyOrderDate()
                
                setOrder(res.data);
            })
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const orderLocal = new Date(donnes.order_date)
    const orderShip = new Date(donnes.order_shipped_date)
    let date = orderShip;
    let date_month = '';
    let date_day = '';

    /// mois
    if (date.getUTCMonth() < 10) {
        date_month = `0${date.getUTCMonth() + 1}`
    }
    else { date_month = date.getUTCMonth() + 1 }

    /// pour le jour 

    if (date.getDate() < 10) {
        date_day = `0${date.getDate()}`
    }
    else { date_day = date.getDate() }

    return (

        <>

            <ReturnButton onClickSee={props.onClickSee} />
            <Encarts title="Fiche commande">
                <p className='text-center'> Références de la commande</p>
                <div className="table-responsive">
                    <table
                        className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                    >
                        <thead>

                            <tr>
                                <th className=" pink bg-lightpink asc" id="order_ref" > Ref </th>
                                <th className=" pink bg-lightpink asc" id="order_tracking_number" > Client</th>
                                <th className=" pink bg-lightpink asc" id="order_date"  >
                                    {" "}
                                    Date de commande{" "}
                                </th>
                                <th className=" pink bg-lightpink asc" id="order_status" > Prix Total </th>
                                <th className=" pink bg-lightpink asc" id="order_status" > Status </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr >
                                <td>
                                    <p>{donnes.order_ref}</p>
                                </td>
                                <td>
                                    <p>{donnes.user_firstname} {donnes.user_lastname} </p>
                                </td>
                                <td>
                                    <p>{orderLocal.toLocaleDateString()} </p>

                                </td>
                                <td>
                                    <p>{donnes.total_price}</p>
                                </td>

                                <td>   

                                        <p className="text-center">
                                            {donnes.order_status_name} 

                                       </p>
                                  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className='text-center'> Liste des articles commandés</p>
                <div className="table-responsive">
                    <table
                        className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                    >
                        <thead>
                            <tr>
                                <th className=" pink bg-lightpink asc" id="order_ref" > Désignation du produit </th>
                                <th className=" pink bg-lightpink " id="order_tracking_number"> Prix TTC</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders &&
                                orders.map((data) => {
                                    return (
                                        <tr >
                                            <td>
                                                <p> {data.product_name} </p>
                                            </td>
                                            <td>
                                                <p>{data.product_price}</p>
                                            </td>
                                        </tr>

                                    )
                                })}

                        </tbody>
                    </table>
                </div>
                <p className='text-center'> Suivi Expédition</p>
                <div className="table-responsive">
                    <table
                        className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                    >
                        <thead>
                            <tr>
                                <th className=" pink bg-lightpink asc" id="order_ref" > Numéro Colissimo</th>
                                <th className=" pink bg-lightpink " id="order_tracking_number" > Date Expédition</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>

                                    {donnes.order_tracking_number}
                                

                                </td>
                                <td>

                                    
                                        {`${date.getUTCFullYear()}-${date_month}-${date_day}`}
                                

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>



            </Encarts>

        </>

    );
}
