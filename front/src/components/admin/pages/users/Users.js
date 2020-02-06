import React, { useState, useEffect } from "react";
import axios from "axios";
import { Encarts, SearchBar, Tables, Pagination } from "../../common";
import EncartViewUser from "./EncartViewUser";
// import FormUsers from './FormUsers'

export default function Users() {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [usersClick, setUsersClick] = useState([]);
  const [clickView, setclickView] = useState(false);

  const [pagesNb, setPagesNb] = useState(0); //pages number
  const [activePage, setActivePage] = useState(1); // number of active page

  const fetchData = props => {
    axios
      .get("/user/role/1") //users list
      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableau
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
        setFullData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [activePage]); // Mettre en commentaire pour recharger les bonnes données à chaque page

  const isClickedSee = index => {
    setclickView(!clickView);
    setUsersClick(dataToShow[index]);
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

  const deleteData = (page, id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      axios.delete(`/user/${id}`);
      alert("Le client à été supprimé avec succès");
    } else {
      alert("Suppression annulée");
    }
    fetchData();
  };

  // fonction pour aller une page en avant
  const changePagePlus = () => {
    setActivePage(activePage + 1); //on ajoute 1 à la page active
  };

  // fonction pour aller une page en arière
  const changePageMoins = () => {
    setActivePage(activePage - 1); //on retire 1 à la page active
  };

  // fonction de recherche dans le tableau
  const search = (table, word) => {
    let theData = fullData;
    if (word !== "") {
      // si le mot recherché n'est pas une chaine vide
      setDataToShow([]); // on vide le tableau à afficher
      let result = theData.filter(
        // on fait un filter et on met le résultat dans la variable result
        line =>
          line.user_lastname.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules(pour que l'on soit sur de toujours comparer des chaines de meme type)
      );
      setDataToShow(dataToShow => [...dataToShow, ...result]); //on rempli le tableau avec le resultat du filter
    } else setDataToShow(data); //si la recherche est vide on veut afficher toutes les données dans le tableau
  };

  return (
    <div className="users">
      {clickView ? (
        <EncartViewUser
          title="Fiche client"
          onClickSee={isClickedSee}
          users={usersClick}
        />
      ) : (
        <Encarts title="Liste des clients">
          <div className="tableActions border-gray">
            <SearchBar search={search} table="users" />
          </div>
          <Tables
            deleteData={deleteData}
            page="users"
            onClickSee={isClickedSee}
            donnees={dataToShow ? dataToShow : "loading"}
            orderBy={orderBy}
          />
          <Pagination
            nbPages={pagesNb}
            activePage={activePage}
            changePagePlus={changePagePlus}
            changePageMoins={changePageMoins}
            setActivePage={setActivePage}
            table="users"
          />
        </Encarts>
      )}
    </div>
  );
}
