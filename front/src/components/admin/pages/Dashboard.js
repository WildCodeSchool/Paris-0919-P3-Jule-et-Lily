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


export default function Dashboard() {

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
            <Encarts>
              <div className="row">
                <Cards title="Ventes de la semaine" benefits="6,740€" />
                <Cards title="Ventes du mois" benefits="25,542€" />
                <Cards title="Ventes du trimestre" benefits="40,690€" />
                <Cards title="Ventes de l'année" benefits="98,121€" />
              </div>
            </Encarts>
            <ButtonCancel />
            <ButtonConfirm />
            <Encarts>
              <div className="tableActions border-gray">
                <SearchBar />
                <div className="addDiv">Ajouter <ButtonAdd /></div>
              </div>
              <Tables data={data.data ? data.data : 'loading'}/>
              <Pagination />
            </Encarts>
            <Encarts>
              <Form />
            </Encarts>
        </div>
    )
}
