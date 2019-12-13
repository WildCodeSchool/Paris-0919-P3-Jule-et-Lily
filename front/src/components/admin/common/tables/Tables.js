import React, { useState } from 'react'

import './sb-admin-2.css'
import './sb-admin-2.min.css'

const Tables = () => {

    const [commandes, setCommandes] = useState();

    return (

        <div>

            <div className="table-responsive">
                <h1 className="text-center text-uppercase text-dark"> Liste des commandes </h1>
                <table className="table table-bordered text-center " id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Ref.</th>
                            <th>Nom</th>
                            <th>Date</th>
                            <th>Prix Total</th>
                            <th>Statut</th>
                            <th> <strong>Action  </strong></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>  2019-11-29-00001</td>
                            {/* {props.numberOrder} */}
                            <td> Jean Paul </td>
                            {/* {props.name}  */}
                            <td>  Belmondo</td>
                            {/* {props.lastname} */}
                            <td> 2019-11-29</td>
                            {/* {props.date}  */}
                            <td>61 €</td>
                            {/* {props.price} */}
                            <td>En cours</td>
                            {/* {props.status} */}
                        </tr>

                    </tbody>

                </table>

            </div>
</div>

    )
}

export default Tables