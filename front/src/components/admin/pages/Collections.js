import React, {useState, useEffect} from "react";
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


export default function Collections() {

    const [data, setData] = useState([]);

    const fetchData = () => {
      const id = 1
      axios.get('/product/' +id)
      //  .then(res => console.log(res.data[0]))
      .then(res => setData({ data: res.data[0] })) ;
    }  
    
    useEffect(() => {
      fetchData()
    }, [])
  

    return (
        <div>
           Collections
        </div>
    )
}
