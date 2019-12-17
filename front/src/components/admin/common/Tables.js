import React, { useState } from 'react'

import '../../../assets/css/admin/global.css'
import '../../../assets/css/admin/Tables.css'
const Tables = () => {

    const [commandes, setCommandes] = useState();

    return (

        <div>

            <div className="table-responsive">
              
                <table className="table table-bordered text-center " id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th className='th-order pink bg-lightpink '>Ref.</th>
                            <th className='th-order pink bg-lightpink '>Nom</th>
                            <th className='th-order pink bg-lightpink '>Date</th>
                            <th className='pink bg-lightpink'>Prix Total</th>
                            <th className='pink bg-lightpink'>Statut</th>
                            <th className='gray bg-lightpink'> <strong>Action  </strong></th>
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