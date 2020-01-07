import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const id = 1;
      // axios.get("/collection/all/ASC") //liste les collections
      axios.get('/product/all') //liste les produits
      // axios.get("/order/all/") //liste les commandes
      // axios.get('/category/all/ASC') //liste les categories
      // axios.get('/promo/all') //liste les promos
      // axios.get('/code-promo/all') //liste les codes promo
      // axios.get('/user/role/1') //liste des clients

      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableaus
        // console.log("activePage", activePage);
        if (res.data.length <= 10) {
          // cas où il y a moins de 10 résultats. Il n'y aura que une page
          setPagesNb(1);
          setData([]); // avant de remplir le tableau on le vide
          for (let i = 0; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
          }
          //si plus de 10 résultats
        } else if (activePage === 1) {
          // si on est sur la première page
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          for (let i = 0; i < 10; i++) {
            setData(data => [...data, res.data[i]]);
          }
        } else if (activePage === pagesNb) {
          // si on est sur la dernière page
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          for (let i = activePage * 10 - 10; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
          }
        } else {
          // si on est sur une autre page
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          for (let i = activePage * 10 - 10; i < activePage * 10; i++) {
            setData(data => [...data, res.data[i]]);
          }
        }
      });
  };

  useEffect(() => {
    // hooks pour recharger les données quand la page change
    fetchData();
  }, [activePage]);

  const changePagePlus = () => {
    // fonction pour aller une page en avant
    setActivePage(activePage + 1);
  };

  const changePageMoins = () => {
    // fonction pour aller une page en arière
    setActivePage(activePage - 1);
  };

  const orderBy = (type, order) => {
    // essai pour ordonnée le tableau
    let theData = data;
    let name = type;
    setData([]);
     console.log(type, order);
    theData.sort((a, b) => {
      console.log(typeof a[type]);
      if (typeof a[type] == "number") {
        if (order === "desc") return b[name] - a[name];
        else return a[name] - b[name]
      }
      if (typeof a[type] == "string") {
        if (order === "desc") {
          if (a[name] < b[name]) return -1;
          if (a [name]> b[name]) return 1;
          return 0;
        } else {
          if (a[name] > b[name]) return -1;
          if (a[name] < b[name]) return 1;
          return 0;
        }
      }
    });

    // console.log(theData);
    setData(data => [...data, ...theData]);
  };

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
          <div className="addDiv">
            Ajouter <ButtonAdd />
          </div>
        </div>
        {/* {console.log('data',data)} */}
        <Tables
          page="products"
          orderBy={orderBy}
          donnees={data ? data : "loading"}
        />
        {console.log(pagesNb)}
        <Pagination
          nbPages={pagesNb}
          activePage={activePage}
          changePagePlus={changePagePlus}
          changePageMoins={changePageMoins}
          setActivePage={setActivePage}
        />
      </Encarts>
      <Encarts>
        <Form />
      </Encarts>
    </div>
  );
}
