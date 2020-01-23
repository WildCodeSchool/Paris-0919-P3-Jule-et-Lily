import React, { useState, useEffect } from 'react';
import { Encarts, ReturnButton } from "../../common";
import Axios from 'axios'
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'

export default function EncartViewUser(props) {
    const [shipping, setShipping] = useState()
    const [billing, setBilling] = useState()
    const [order, setOrder] = useState()
    const [orderPrice, setOrderPrice] = useState()
    console.log('coucou', shipping);
    console.log('cou', billing);
    console.log('c', order);
    console.log('c1', orderPrice);

    const user = props.users
    const user_birthday = new Date(user.user_date_of_birth);
    const user_registration = new Date(user.user_registration_date)


    const fetchShipping = () => {
        Axios
            .get(`/user/shipping/${user.user_id}`) // we catch values
            .then(res => setShipping(res.data))
    }

    const fetchBilling = () => {
        Axios
            .get(`/user/billing/${user.user_id}`) // we catch values
            .then(res => setBilling(res.data))
    }

    const fetchOrder = () => {
        Axios
            .get(`/user/order/${user.user_id}`) // we catch values
            .then(res => setOrder(res.data))
    }

    const fetchOrderPrice = () => {
        Axios
            .get(`/user/orderprice/${user.user_id}`) // we catch values
            .then(res => setOrderPrice(res.data))
    }

    useEffect(() => {
        fetchShipping()
        fetchBilling()
        fetchOrder()
        fetchOrderPrice()
    }, [])

    return (
        <>
            <ReturnButton onClickSee={props.onClickSee} />
            <Encarts title="Fiche client">
                <div className="media-text">
                    <h1 className="card-title text-center middlepurple ">{user.user_firstname} {user.user_lastname}</h1>
                </div>
                <div class="media" style={{ width: "100%" }} >
                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr key='1'>
                                <th>
                                    {" "}
                                    <p>Nom</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Prénom</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Date de Naissance</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Inscription</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Email</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr>
                                        <td>
                                            {" "}
                                            <p>{user.user_lastname}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{user.user_firstname}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{user_birthday.toLocaleDateString()}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{user_registration.toLocaleDateString()}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{user.user_email}</p>
                                        </td>
                                    </tr>
                        </tbody>
                    </table>
                </div>
                <div className="media-text">
                    <p className="card-text gray text-center">Adresse de facturation</p>
                </div>
                <div class="media" style={{ width: "100%" }} >
                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr key='1'>
                                <th>
                                    {" "}
                                    <p>Adresse</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Ville</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Zip-code</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Téléphone</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Société</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {" "}
                                    <p>{shipping && shipping[0].address_street}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{shipping && shipping[0].address_city}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{shipping && shipping[0].address_zip_code}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>0{user.user_phone}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{shipping && shipping[0].address_company_name}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="media-text">
                    <p className="card-text gray text-center">Adresse de livraison</p>
                </div>
                <div class="media" style={{ width: "100%" }} >
                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr key='1'>
                                <th>
                                    {" "}
                                    <p>Adresse</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Ville</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Zip-code</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Téléphone</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Société</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {" "}
                                    <p>{billing && billing[0].address_street}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{billing && billing[0].address_city}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{billing && billing[0].address_zip_code}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>0{user.user_phone}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{billing && billing[0].address_company_name}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="media-text">
                    <p className="card-text gray text-center">Historique des commandes</p>
                </div>
                <div class="media" style={{ width: "100%" }}>
                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr key='1'>
                                <th>
                                    {" "}
                                    <p>Référence</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Nom</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Date</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Prix total</p>
                                </th>
                                <th>
                                    {" "}
                                    <p>Statut</p>
                                </th>
                                <td className='actionButtons'>
                                    {" "}
                                    <p>Facture</p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {order && order.map((data, i) => {
                                const order_date = new Date(data.order_date);
                                return (
                                    <tr>
                                        <td>
                                            {" "}
                                            <p>{data.order_ref}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{user.user_firstname} {user.user_lastname}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{order_date.toLocaleDateString()}</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{orderPrice && orderPrice[0].total_price} €</p>
                                        </td>
                                        <td>
                                            {" "}
                                            <p>{data.order_status_name}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Encarts>
        </>
    )
}