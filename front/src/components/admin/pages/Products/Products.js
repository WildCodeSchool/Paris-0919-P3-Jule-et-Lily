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
  Form,

} from "../../common";
import EncartsViewArticle from "./EncartsViewArticle";
import FormProducts from './FormProducts'

export default function Products(props) {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [click, setClick] = useState(false);
  const [productClick, setProductClick] = useState([]);
  const [clickView, setclickView] = useState(false);

  const fetchData = () => {
    axios
      .get("/product/all")
      //  .then(res => console.log(res.data[0]))
      .then(res => (setData(res.data), setDataToShow(res.data)));
  };

  const isClickedModidy = index => {
    console.log("click!");
    setClick(!click);
    setProductClick(data[index]);
  };
  const isClickedSee = index => {
    console.log("click! delete");
    setclickView(!clickView);
    console.log("data", data, "index", index);
    // console.log('data[index]',data[index])
    setProductClick(data[index]);
  };

  useEffect(() => {
    fetchData();
  }, []);


  // fonction pour ordonnée le tableau
  const orderBy = (type, order) => {
    let theData = dataToShow; //on copie les données dans un nouveau tableau
    setDataToShow([]); // on vide le tableau à afficher pour pouvoi le re-remplir plus tard
    theData.sort((a, b) => { // on utilise la méthode sort pour trier
      //si on veut trier des nombres
      if (typeof a[type] == "number") {
        if (order === "desc") return b[type] - a[type];
        else return a[type] - b[type];
      }
      //si on veut trier des chaines de caractères
      if (typeof a[type] == "string") {
        if (order === "desc") {
          if (a[type] < b[type]) return -1;
          if (a[type] > b[type]) return 1;
          return 0;
        } else {
          if (a[type] > b[type]) return -1;
          if (a[type] < b[type]) return 1;
          return 0;
        }
      }
    });
    //on met les données triées dans le tableau à afficher
    setDataToShow(dataToShow => [...dataToShow, ...theData]);
  };

  // fonction de recherche dans le tableau
  const search = (table, word) => {
    let theData = data;
    if (word !== "") {
      // si le mot recherché n'est pas une chaine vide
      setDataToShow([]); // on vide le tableau à afficher
      let result = theData.filter(
        // on fait un filter et on met le résultat dans la variable result
        line =>
          line.product_name.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules(pour que l'on soit sur de toujours comparer des chaines de meme type)
      );
      setDataToShow(dataToShow => [...dataToShow, ...result]); //on rempli le tableau avec le resultat du filter
    } else setDataToShow(data); //si la recherche est vide on veut afficher toutes les données dans le tableau
  };

  // passer la props à table ici

  console.log("dataproducts", data);
  console.log("proctclick", productClick);

  return (
    <div className="products">
      {clickView ? (
        <EncartsViewArticle
          title=" Fiche produit"
          onClickSee={isClickedSee}
          donneesProducts={productClick}
        />
      ) : click ? (
        <div>
          <FormProducts
            onClick={isClickedModidy}
            donneesProducts={productClick}
          />
        </div>
      ) : (
        <Encarts title="Liste des Produits">
          <div className="tableActions border-gray">
            <SearchBar search={search} table="product" />
            <div className="addDiv">
              Ajouter <ButtonAdd />
            </div>
          </div>
          <Tables
            page="products"
            onClickSee={isClickedSee}
            onClick={isClickedModidy}
            donnees={dataToShow ? dataToShow : "loading"}
            orderBy={orderBy}
          />
        </Encarts>
      )}
    </div>
  );
}
