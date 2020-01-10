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

  const isClickedModidy = (index) => {
    console.log('click!');
    setClick(!click)
    setProductClick(data[index])
  }
  const isClickedSee = (index) => {
    console.log('click! delete');
    setclickView(!clickView)
    console.log('data', data, 'index', index)
    // console.log('data[index]',data[index])
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

      {clickView ? <EncartsViewArticle title=' Fiche produit' onClickSee={isClickedSee} donneesProducts={productClick} />
        :
        click ?
          <div>
            <FormProducts onClick={isClickedModidy} donneesProducts={productClick} />
          </div>
          :
          <Encarts title='Liste des Produits'>
            <Tables page='products' onClickSee={isClickedSee} onClick={isClickedModidy} donnees={data ? data : 'loading'} />
          </Encarts>}
    </div>
  )
}
