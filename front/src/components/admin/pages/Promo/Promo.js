import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ButtonAdd,
  Encarts,
  SearchBar,
  Tables,
  Pagination
} from "../../common";
import EncartsViewPromo from "./EncartsViewPromo";
import EncartsViewCodePromo from "./EncartsViewCodePromo";
import FormPromo from "./FormPromo";
import FormCodePromo from "./FormCodePromo";
import FormAddPromo from "./FormAddPromo";
import FormAddCodePromo from "./FormAddCodePromo";
import "../../../../assets/css/admin/Promo.css"

export default function Promo(props) {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [click, setClick] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [clickView, setClickView] = useState(false);
  const [promoClick, setPromoClick] = useState([]);

  const [data2, setData2] = useState([]);
  const [dataToShow2, setDataToShow2] = useState([]);
  const [clickCodePromo, setClickCodePromo] = useState(false);
  const [clickAddCodePromo, setClickAddCodePromo] = useState(false);
  const [clickViewCodePromo, setClickViewCodePromo] = useState(false);
  const [codePromoClick, setCodePromoClick] = useState([]);

  //state pour le nombre de pages du tableau
  const [pagesNb, setPagesNb] = useState(0); //le nombre de pages
  const [activePage, setActivePage] = useState(1); // le numéro de la page active

  const [pagesNb2, setPagesNb2] = useState(0); //le nombre de pages
  const [activePage2, setActivePage2] = useState(1); // le numéro de la page active


  const fetchData = () => {
    axios
      .get("/promo/all") //liste les commandes
      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableaus
        // console.log("activePage", activePage);
        if (res.data.length <= 10) {
          // cas où il y a moins de 10 résultats. Il n'y aura que une page
          setPagesNb(1); // il n'y a qu'une page.
          setData([]); // avant de remplir le tableau on le vide
          setDataToShow([]); // idem
          for (let i = 0; i < res.data.length; i++) {
            // on boucle pour remplir les deux tableau avec les données
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
          //si plus de 10 résultats
        } else if (activePage === 1) {
          // si on est sur la première page
          setPagesNb(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData([]);
          setDataToShow([]);
          for (let i = 0; i < 10; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else if (activePage === pagesNb) {
          // si on est sur la dernière page
          setPagesNb(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else {
          // si on est sur une autre page
          setPagesNb(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < activePage * 10; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        }
      });
    axios
      .get("/code-promo/all") //liste les commandes
      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableaus
        // console.log("activePage", activePage);
        if (res.data.length <= 10) {
          // cas où il y a moins de 10 résultats. Il n'y aura que une page
          setPagesNb2(1); // il n'y a qu'une page.
          setData2([]); // avant de remplir le tableau on le vide
          setDataToShow2([]); // idem
          for (let i = 0; i < res.data.length; i++) {
            // on boucle pour remplir les deux tableau avec les données
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
          //si plus de 10 résultats
        } else if (activePage2 === 1) {
          // si on est sur la première page
          setPagesNb2(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData2([]);
          setDataToShow2([]);
          for (let i = 0; i < 10; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        } else if (activePage2 === pagesNb2) {
          // si on est sur la dernière page
          setPagesNb2(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData2([]);
          setDataToShow2([]);
          for (let i = activePage2 * 10 - 10; i < res.data.length; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        } else {
          // si on est sur une autre page
          setPagesNb2(parseInt(res.data.length / 10 + 1)); // on défini le nombre de pages en fonction du nombre de données
          setData2([]);
          setDataToShow2([]);
          for (let i = activePage2 * 10 - 10; i < activePage2 * 10; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        }
      });
  };

  const deleteData = (page, id) => {
    axios.delete(`promo/${id}`).then(fetchData());
    alert("La promo à été supprimé avec succès");
  };

  const isClickedModidy = index => {
    // console.log("click!");
    setClick(!click);
    setPromoClick(data[index]);
  };

  const isClickedSee = index => {
    // console.log("click!");
    setClickView(!clickView);
    setPromoClick(data[index]);
  };

  const isClickedAddPromo = () => {
    setClickAdd(!clickAdd);
  };

  useEffect(() => {
    fetchData();
  }, [activePage, activePage2]);

  //fonction pour remettre le state click a false puis recharger les données quand on clique sur le bouton
  const reload = () => {
    setClick(!click);
    fetchData();
  };

  const reloadAdd = () => {
    setClickAdd(!clickAdd);
    fetchData();
  };

  const deleteData2 = (page, id) => {
    axios.delete(`code-promo/${id}`).then(fetchData());
    alert("Le code promo à été supprimé avec succès");
  };

  const isClickedModifyCodePromo = index => {
    // console.log("click!");
    setClickCodePromo(!clickCodePromo);
    setCodePromoClick(data2[index]);
  };

  const isClickedSeeCodePromo = index => {
    // console.log("click!");
    setClickViewCodePromo(!clickViewCodePromo);
    setCodePromoClick(data2[index]);
  };

  const isClickedAddCodePromo = () => {
    setClickAddCodePromo(!clickAddCodePromo);
  };

  //fonction pour remettre le state click a false puis recharger les données quand on clique sur le bouton
  const reloadCodePromo = () => {
    setClickCodePromo(!clickCodePromo);
    fetchData();
  };

  const reloadAddCodePromo = () => {
    setClickAddCodePromo(!clickAddCodePromo);
    fetchData();
  };



  // fonction pour ordonnée le tableau
  const orderBy = (type, order) => {
    let theData = dataToShow; //on copie les données dans un nouveau tableau
    setDataToShow([]); // on vide le tableau à afficher pour pouvoi le re-remplir plus tard
    theData.sort((a, b) => {
      // on utilise la méthode sort pour trier
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
      return null;
    });
    //on met les données triées dans le tableau à afficher
    setDataToShow(dataToShow => [...dataToShow, ...theData]);
  };

  // fonction de recherche dans le tableau
  const search = (table, word) => {
    if (table === "promo") {
      let theData = data;
      if (word !== "") {
        // si le mot recherché n'est pas une chaine vide
        setDataToShow([]); // on vide le tableau à afficher
        let result = theData.filter(
          // on fait un filter et on met le résultat dans la variable result
          line =>
            line.promo_name.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules(pour que l'on soit sur de toujours comparer des chaines de meme type)
        );
        setDataToShow(dataToShow => [...dataToShow, ...result]); //on rempli le tableau avec le resultat du filter
      } else setDataToShow(data); //si la recherche est vide on veut afficher toutes les données dans le tableau

    } else if (table === "code-promo") {
      let theData = data2;
      if (word !== "") {
        // si le mot recherché n'est pas une chaine vide
        setDataToShow2([]); // on vide le tableau à afficher
        let result = theData.filter(
          // on fait un filter et on met le résultat dans la variable result
          line =>
            line.code_promo_name.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules(pour que l'on soit sur de toujours comparer des chaines de meme type)
        );
        setDataToShow2(dataToShow2 => [...dataToShow2, ...result]); //on rempli le tableau avec le resultat du filter
      } else setDataToShow2(data2); //si la recherche est vide on veut afficher toutes les données dans le tableau
    }
  };

  // passer la props à table ici

  console.log("datapromo", data);
  // console.log("proctclick", productClick);
  // fonction pour aller une page en avant
  const changePagePlus =  table => {
      table === "promo" ?
      setActivePage(activePage + 1) 
      :
      setActivePage2(activePage2 + 1) 
       //on ajoute 1 à la page active
  };

  // fonction pour aller une page en arière
  const changePageMoins = table => {
    table === "promo" ?
    setActivePage(activePage - 1)
    :
    setActivePage2(activePage2 - 1) 
    
    //on retire 1 à la page active
  };

  return (
    <>
      <div className="promo">
        {clickAdd ? (
          <FormAddPromo onClick={isClickedAddPromo} reloadAdd={reloadAdd} />
        ) : clickView ? (
          <EncartsViewPromo
            title="Fiche promo"
            onClickSee={isClickedSee}
            donneesPromo={promoClick}
          />
        ) : click ? (
          <div>
            <FormPromo
              onClick={isClickedModidy}
              donneesPromo={promoClick}
              reload={reload}
            />
          </div>
        ) : (
          <Encarts title="Liste des Promos">
            <div className="tableActions border-gray">
              <SearchBar search={search} table="promo" />
              <div className="addDiv">
                Ajouter <ButtonAdd onClick={isClickedAddPromo} />
              </div>
            </div>
            <Tables
              deleteData={deleteData}
              page="promo"
              onClickSee={isClickedSee}
              onClick={isClickedModidy}
              donnees={dataToShow ? dataToShow : "loading"}
              orderBy={orderBy}
            />

            <Pagination
              nbPages={pagesNb}
              activePage={activePage}
              changePagePlus={changePagePlus}
              changePageMoins={changePageMoins}
              setActivePage={setActivePage}
              table="promo"
            />
          </Encarts>
        )}
      </div>
{/* code-promo */}
      <div className="code-promo">
        {clickAddCodePromo ? (
          <FormAddCodePromo
            onClick={isClickedAddCodePromo}
            reloadAdd={reloadAddCodePromo}
          />
        ) : clickViewCodePromo ? (
          <EncartsViewCodePromo
            title="Fiche code promo"
            onClickSee={isClickedSeeCodePromo}
            donneesPromo={codePromoClick}
          />
        ) : clickCodePromo ? (
          <div>
            <FormCodePromo
              onClick={isClickedModifyCodePromo}
              donneesPromo={codePromoClick}
              reload={reloadCodePromo}
            />
          </div>
        ) : (
          <Encarts title="Liste des codes promo">
            <div className="tableActions border-gray">
              <SearchBar search={search} table="code-promo" />
              <div className="addDiv">
                Ajouter <ButtonAdd onClick={isClickedAddCodePromo} />
              </div>
            </div>
            <Tables
              deleteData={deleteData2}
              page="code-promo"
              onClickSee={isClickedSeeCodePromo}
              onClick={isClickedModifyCodePromo}
              donnees={dataToShow2 ? dataToShow2 : "loading"}
              orderBy={orderBy}
            />

            <Pagination
              nbPages={pagesNb2}
              activePage={activePage2}
              changePagePlus={changePagePlus}
              changePageMoins={changePageMoins}
              setActivePage={setActivePage2}
              table="code-promo"
            />
          </Encarts>
        )}
      </div>
    </>
  );
}
