import React, { useState, useEffect } from 'react';
import { Encarts, ReturnButton } from "../../common";
import ButtonDelete from "../../common/ButtonDelete";
import ButtonModify from "../../common/ButtonModify";
import ButtonSee from "../../common/ButtonSee";
import '../../../../assets/css/admin/global.css'
import '../../../../assets/css/admin/cards.css'

export default function EncartViewUser(props) {

    const user = props.donneesUsers

    return (
        <>
            <ReturnButton onClickSee={props.onClickSee} />
            <Encarts title="Fiche client">
                <div className="media-text">
                    <h1 className="card-title text-center middlepurple ">monsieur a b</h1>
                </div>

                <div class="media" style={{ width: "100%" }} >
                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <tbody>
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
                        <tbody>
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
                                    <p>Socité</p>
                                </th>
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
                        <tbody>
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
                        </tbody>
                    </table>
                </div>

                <div className="media-text">
                    <p className="card-text gray text-center">Historique des commandes</p>
                </div>

                <div class="media" style={{ width: "100%" }} >

                    <table className="table table-bordered text-center "
                        id="dataTable"
                        width="100%"
                        cellSpacing="0">
                        <tbody>
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
                                    <p>Statu</p>
                                </th>
                                <td className='actionButtons'>
                                    <ButtonModify  onClick={props.onClick} />
                                    <ButtonSee onClickSee={props.onClickSee} />
                                    <ButtonDelete  />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Encarts>

        </>
    );

}