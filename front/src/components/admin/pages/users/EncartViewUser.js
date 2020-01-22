import React, { useState, useEffect } from 'react';
import { Encarts, ReturnButton } from "../../common";
import Axios from 'axios'
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'

export default function EncartViewUser(props) {
    const [shipping, setShipping] = useState()
    const [billing, setBilling] = useState()
    const [order, setOrder] = useState()
    console.log('coucou', shipping);
    console.log('cou', billing);
    console.log('c', order);

    const user = props.users

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

    useEffect(() => {
        fetchShipping()
        fetchBilling()
        fetchOrder()
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
                                    <p>{user.user_date_of_birth}</p>
                                </td>
                                <td>
                                    {" "}
                                    <p>{user.user_registration_date}</p>
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
                                    <p>{user.user_phone}</p>
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
                                    <p>{user.user_phone}</p>
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
                            const shipped_date = new Date(data.order_shipped_date);
                                return (
                                <tr>
                                    <td>
                                        {" "}
                                <p>{data.order_ref}</p>
                                    </td>
                                    <td>
                                        {" "}
                                        <p>{user.user_lastname} {user.user_firstname}</p>
                                        {/* <p>{user.user_lastname} {user.user_firstname}</p> */}
                                    </td>
                                    <td>
                                        {" "}
                                        <p>{data.order_date}</p>
                                    </td>
                                    <td>
                                        {" "}
                                        <p>{user.user_phone}</p>
                                    </td>
                                    <td>
                                        {" "}
                                        <p>{shipping && shipping[0].address_company_name}</p>
                                    </td>
                                </tr>
                                )})}
                        </tbody>
                    </table>
                </div>
            </Encarts>
        </>
    )
}