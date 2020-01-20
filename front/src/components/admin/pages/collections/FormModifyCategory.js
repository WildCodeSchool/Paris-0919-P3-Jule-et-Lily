import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
export default function FormModifyCategory(props) {



  const [CollectionModify, setProductModify] = useState(props.donneesProducts)


  return (
    <>
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
         

          <p className="card-text gray mt-2"></p>
          <div className='text-left'>
            <ButtonCancel onClick={props.onClickSee} color='#234eb7' />
            <ButtonConfirm  color='#234eb7' />
          </div>
        </form>

      </Encarts>

    </>

  );
}
