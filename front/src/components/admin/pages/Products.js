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
  Form,
  FormProducts,
} from "../common/";


export default function Products(props) {

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [productClick, setProductClick] = useState([])


  const NewProduct = () => {
    setProductClick(productClick)

  }

  const fetchData = () => {

    axios.get('/product/all')
      //  .then(res => console.log(res.data[0]))
      .then(res => setData(res.data));
  }

  const isClicked = () => {
    setClick(!click)
    setProductClick(data)
    
  }
  useEffect(() => {
    fetchData()
  
  }, [])

  // passer la props à table ici 


  console.log('dataproducts', data);
  console.log('pructclick', productClick);

  return (
    <div className='products'>
      {click ? <div> <FormProducts cliquer={isClicked} donneesProducts={productClick} /> </div> : <Encarts title='Liste des Produits'> <Tables page='products' cliquer={isClicked} donnees={data ? data : 'loading'} /> </Encarts>}
    </div>
  )
}
