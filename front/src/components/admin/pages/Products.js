import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  ButtonAdd,
  ButtonConfirm,
  ButtonDelete,
  ButtonModify,
  ButtonSee,
  ButtonCancel,
  Cards,
  Encarts,
  Pagination,
  SearchBar,
  Tables,
  Form
} from "../common/";


export default function Products(props) {

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);

  const isClicked = () => {
    setClick(!click)
    

  }

  const fetchData = () => {

    axios.get('/product/all')
      //  .then(res => console.log(res.data[0]))
      .then(res => setData({ data: res.data }));
  }


  useEffect(() => {
    fetchData()
  }, [])

  // passer la props à table ici 


console.log('dataproducts',data.data);

  return (
    <div className='products'>
      {click ? <div> <Form />  <ButtonModify cliquer={isClicked}/> </div> : <Tables page='products' cliquer={isClicked} donnees={data.data ? data : 'loading'} />}
    </div>
  )
}
