import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'
import {
    Encarts,
    ReturnButton,
    ButtonAdd,
    ButtonCancel,
    ButtonConfirm,
    Tables,
} from "../../common";



export default (props) => {
    const [orders, setOrder] = useState(); 
// axios vers les /:id/items pour remplir le 2 tab'
    console.log('ici la data order', props.donneesOrder);
    console.log('order', orders);
    
    const order =  props.donneesOrder;

    const fetchOrders = () => {
        axios
          .get(`/order/${order.order_id}/items`) //liste les commandes
          .then(res => {
            setOrder(res.data);
              })
            }

    const handleSort = (e) => {
        //console.log(e.target)
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

    const orderView = props.donneesOrder

    const orderLocal = new Date(order.order_date)
    const orderShip = new Date(order.order_shipped_date)



    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <>
            <ReturnButton  onClickSee={props.onClick}/>
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
                                <th className=" pink bg-lightpink " id="order_tracking_number" > Client</th>
                                <th className=" pink bg-lightpink asc" id="order_date" >
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
                                    <p>{order.order_ref}</p>
                                </td>
                                <td>
                                    <p>{order.user_firstname} {order.user_lastname} </p>
                                </td>
                                <td>
                                    <p>{orderLocal.toLocaleDateString()} </p>
                                   
                                </td>
                                <td>
                                    <p>{order.total_price}</p>
                                </td>
                                <td>
                                    <p>{order.order_status_name}</p>
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
                       
                            <tr >
                                <td>
                                    <p> nom du produit</p>
                                </td>
                                <td>
                                    <p>prix du produit</p>
                                </td>
                            </tr>
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
                                <th className=" pink bg-lightpink asc" id="order_ref" >Numéro Colissimo</th>
                                <th className=" pink bg-lightpink " id="order_tracking_number" > Date Expédition</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>
                                    <p>{order.order_tracking_number}</p>
                                </td>
                                <td>
                                    <p>{orderShip.toLocaleDateString()}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='text-right'>
                    <ButtonCancel onClick={props.onClick} color='#dd73da' />
                    <ButtonConfirm color='#dd73da'  />
                </div>

            </Encarts>

        </>
    );
}