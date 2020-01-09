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
} from "../../common";
import EncartsViewArticle from './EncartsViewArticle';

export default function Products(props) {

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [productClick, setProductClick] = useState([])
  const [clickView, setclickView] = useState(false)
  
  const fetchData = () => {

    axios.get('/product/all')
      //  .then(res => console.log(res.data[0]))
      .then(res => setData(res.data));
  }

  const isClicked = (index) => {
    console.log('click!');
    setClick(!click)
    setProductClick(data[index])
  }
  const isClickedDelete = (index) => {
    console.log('click! delete');
    setclickView(!clickView)
    setProductClick(data[index])
  }

  useEffect(() => {
    fetchData()
  
  }, [])

  // passer la props à table ici 


  console.log('dataproducts', data);
  console.log('proctclick', productClick);

  return (
    <div className='products'>
     
      {clickView ? <EncartsViewArticle title=' Fiche produit' onClickSee={isClickedDelete} donneesProducts={productClick}/> : click ? <div> <FormProducts onClick={isClicked} donneesProducts={productClick} /> </div> : <Encarts title='Liste des Produits'> <Tables page='products'  onClickSee={isClickedDelete} onClick={isClicked} donnees={data ? data : 'loading'} /> </Encarts>}
    </div>
  )
}
