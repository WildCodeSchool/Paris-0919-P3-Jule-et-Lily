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

    //state pour le nombre de pages du tableau 
    const [pagesNb, setPagesNb] = useState(0);
    const [activePage, setActivePage] = useState(1);


  const fetchData = () => {
      const id = 1
      axios.get('/collection/all/ASC') //liste les collections
      //  axios.get('/product/all') //liste les produits 
      // axios.get('/order/all') //liste les commandes
      // axios.get('/category/all/ASC') //liste les categories
      // axios.get('/promo/all') //liste les promos
      // axios.get('/code-promo/all') //liste les codes promo
      // axios.get('/user/role/1') //liste des clients
      //  .then(res => console.log(res.data[0]))
      .then(res => {
        console.log('activePage', activePage)
        if (res.data.length <= 10)
          setPagesNb(1); 
        else setPagesNb(parseInt((res.data.length/10) +1))    

        if (res.data.length <10 ){
          setData([])
          for (let i = 0 ; i < res.data.length ; i++){
            setData(data=> [...data, res.data[i]])
        }
        }
        else if (activePage === 1){
          setData([])
        for (let i = 0 ; i < 10 ; i++){
              setData(data=> [...data, res.data[i]])
          }
        }
        else if(activePage === pagesNb){
         setData([])
          for (let i = activePage*10 -10 ; i < res.data.length ; i++)  {
              setData(data=> [...data, res.data[i]])  
          }      
        }
        else {
          setData([])
          for (let i = activePage*10 -10 ; i < activePage*10 ; i++)  {
              setData(data=> [...data, res.data[i]])  
          } 
        }
      }
      ) ;
    }  

    // useEffect(() => {
    //   fetchData()   
    // }, [])

    useEffect(() => {
      fetchData();
    }, [activePage])


    const changePagePlus = () => {
      setActivePage(activePage+1) 
    } 

    const changePageMoins = () => {
      setActivePage(activePage-1)
    }
   

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
              {/* {console.log('data',data)} */}
              <Tables page="collections" donnees={data ? data : 'loading'}/>
              {console.log(pagesNb)}
              <Pagination nbPages={pagesNb} activePage={activePage} changePagePlus={changePagePlus} changePageMoins={changePageMoins} setActivePage={setActivePage}/>
            </Encarts>
            <Encarts>
              <Form />
            </Encarts>
        </div>
    )
}
