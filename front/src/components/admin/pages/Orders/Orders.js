import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ButtonAdd,
  Encarts,
  Pagination,
  SearchBar,
  Tables,
  ReturnButton
} from "../../common/";
import FormOrder from './FormOrder'
import EncartViewOrder from './EncartViewOrder'
export default function Orders() {
  //state des données
  const [data, setData] = useState([]); //le tableau qui contiendra les données récupérées par axios
  const [dataToShow, setDataToShow] = useState([]); // une copie du premier tableau qui va servir à afficher les données et sur lequel on va executer les fonctions (filter, sort, etc...)
  const [fullData, setFullData] = useState([])

  //state pour le nombre de pages du tableau
  const [pagesNb, setPagesNb] = useState(0); //le nombre de pages
  const [activePage, setActivePage] = useState(1); // le numéro de la page active

  const [clickModify, setClickModify] = useState(false);
  const [orderClick, setOrderClick] = useState([]);
  const [clickView, setclickView] = useState(false);

  const isClickedModify = (index) => {
    setClickModify(!clickModify);
    setOrderClick(dataToShow[index]);

  }

  const isClickedSee = index => {
    setclickView(!clickView);
    setOrderClick(dataToShow[index]);
    
    

    // console.log('data[index]',data[index])
  };

  // fonction pour récupérer les données de la BDD
  const fetchData = () => {
    axios
      .get("/order/all") //liste les commandes
      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableaus
        // console.log("activePage", activePage);
        if (res.data.length <= 10) {
          // cas où il y a moins de 10 résultats. Il n'y aura que une page
          setPagesNb(1); // il n'y a qu'une page.
          setData([]); // avant de remplir le tableau on le vide
          setDataToShow([]); // idem
          for (let i = 0; i < res.data.length; i++) { // on boucle pour remplir les deux tableau avec les données
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
          setPagesNb(parseInt(res.data.length / 10 + 1));// on défini le nombre de pages en fonction du nombre de données
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else {
          // si on est sur une autre page
          setPagesNb(parseInt(res.data.length / 10 + 1));// on défini le nombre de pages en fonction du nombre de données
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < activePage * 10; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        }
        setFullData(res.data)
      });
  };

  //fonction pour supprimer des données dans la BDD
  const deleteData = (page, id) => {
    if (window.confirm("Voulez vous vraiment supprimer la commande ?")) {
      let path = `order/${id}`; // la route avec l'id de l'objet à supprimmer 
      axios.delete(path) // axios delete sur la route
      alert('La commande à bien été supprimée')
    }
    else {
      alert("Suppression annulée")
    }
    fetchData()
  }


  // hooks pour recharger les données quand la page change
  useEffect(() => {
    fetchData();
  }, [activePage]);

  // fonction pour aller une page en avant
  const changePagePlus = () => {
    setActivePage(activePage + 1); //on ajoute 1 à la page active
  };

  // fonction pour aller une page en arière
  const changePageMoins = () => {
    setActivePage(activePage - 1);//on retire 1 à la page active
  };

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
      return null
    });
    //on met les données triées dans le tableau à afficher
    setDataToShow(dataToShow => [...dataToShow, ...theData]);
  };

  // fonction de recherche dans le tableau
  const search = (table, word) => {
    let theData = fullData;
    if (word !== "") {  // si le mot recherché n'est pas une chaine vide 
      setDataToShow([]); // on vide le tableau à afficher
      let result = theData.filter( // on fait un filter et on met le résultat dans la variable result
        line => line.order_status_name.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules(pour que l'on soit sur de toujours comparer des chaines de meme type)
      );
      setDataToShow(dataToShow => [...dataToShow, ...result]); //on rempli le tableau avec le resultat du filter
    }
    else setDataToShow(data); //si la recherche est vide on veut afficher toutes les données dans le tableau
  };

  const reload = () => {
    setClickModify(!clickModify);
    fetchData();
  };

  return (
    <div>
      {clickView ? <EncartViewOrder onClickSee={isClickedSee}  donneesOrder={orderClick}/> :
      
      clickModify ? <> <FormOrder onClick={isClickedModify} reload={reload} donneesOrder={orderClick} />


      </>
      : (

        <>

        <Encarts title="LISTE DES COMMANDES">
          <div className="tableActions border-gray">
            <SearchBar search={search} table="orders" />

          </div>
          <Tables
            page="order"
            donnees={dataToShow ? dataToShow : "loading"}
            orderBy={orderBy}
            deleteData={deleteData}
            onClick={isClickedModify}
            onClickSee={isClickedSee}
          />
          <Pagination
            nbPages={pagesNb}
            activePage={activePage}
            changePagePlus={changePagePlus}
            changePageMoins={changePageMoins}
            setActivePage={setActivePage}
            table="order"
          />
        </Encarts>

      </>)}
    </div>

  );
}

