import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Encarts, SearchBar, Tables, Pagination } from "../../common";
import EncartViewUser from "./EncartViewUser";
import FormUsers from './FormUsers'

export default function Users() {
  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [pagesNb, setPagesNb] = useState(0); //pages number
  const [activePage, setActivePage] = useState(1); // number of active page

  const fetchData = (props) => {
    axios
      .get("/user/1") //users list
      .then(res => {
        // après avoir récuperé les données on regarde leurs nombre et on définit le nombre de page en fonction puis on rempli seulement 10 donnée max par page du tableau
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
      });
  };

  useEffect(() => {
    fetchData()
  }, [])

  const deleteData = (page, id) => {
    axios.delete(`/user/${id}`)
      .then(fetchData())
    alert('Le client à été supprimé avec succès')
  }

  // fonction pour aller une page en avant
  const changePagePlus = () => {
    setActivePage(activePage + 1); //on ajoute 1 à la page active
  };

  // fonction pour aller une page en arière
  const changePageMoins = () => {
    setActivePage(activePage - 1);//on retire 1 à la page active
  };


  return (
    <div className="users">
      <Encarts title="Liste des clients">
        <Tables
          page="users"
          donnees={dataToShow ? dataToShow : "loading"}
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
    </div>
  );
}
