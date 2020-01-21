import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ButtonAdd,
  Encarts,
  Pagination,
  SearchBar,
  Tables,
  ReturnButton,
} from "../../common";

export default function Collections(props) {
  const [data, setData] = useState([]); // prendra le resultat du axios et ne doit plus changer sauf si on refait le axios
  const [dataToShow, setDataToShow] = useState([]); // resultat du axios qui peut changer et qu'on affiche dans le tableau. Permet de faire la recherche
  const [fullData, setFullData]= useState([])
;
  const [pagesNb, setPagesNb] = useState(0);
  const [activePage, setActivePage] = useState(1);

  // données du deuxième tableau
  const [data2, setData2] = useState([]);
  const [dataToShow2, setDataToShow2] = useState([]);
  const [fullData2, setFullData2]= useState([])



  // pages du deuxième tableau
  const [pagesNb2, setPagesNb2] = useState(0);
  const [activePage2, setActivePage2] = useState(1);

  const [click, setClick] = useState(false);
  const [clickView, setclickView] = useState(false);
  const isClickedModidy = index => {
    console.log("click!");
    setClick(!click);
  };
  const isClickedSee = index => {
    console.log("click! delete");
    setclickView(!clickView);
    console.log("data", data, "index", index);
    // console.log('data[index]',data[index])
  };

  const deleteData = (page, id) => {
    let path = "";
    if (page === "collections")
      path = `collection/${id}`
    else
      path = `category/${id}`

    axios.delete(path)
      .then(fetchData())
  }

  const fetchData = () => {
    axios
      .get("/collection/all/ASC") // liste les collections
      .then(res => {
        if (res.data.length <= 10) {
          setPagesNb(1);
          setData([]);
          setDataToShow([]);
          for (let i = 0; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else if (activePage === 1) {
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          setDataToShow([]);
          for (let i = 0; i < 10; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else if (activePage === pagesNb) {
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < res.data.length; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        } else {
          setPagesNb(parseInt(res.data.length / 10 + 1));
          setData([]);
          setDataToShow([]);
          for (let i = activePage * 10 - 10; i < activePage * 10; i++) {
            setData(data => [...data, res.data[i]]);
            setDataToShow(dataToShow => [...dataToShow, res.data[i]]);
          }
        }
        setFullData(res.data)
      });

    axios
      .get("/category/all/ASC") // liste les catégories
      .then(res => {
        if (res.data.length <= 10) {
          setPagesNb2(1);
          setData2([]);
          setDataToShow2([]);
          for (let i = 0; i < res.data.length; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        } else if (activePage2 === 1) {
          setPagesNb2(parseInt(res.data.length / 10 + 1));
          setData2([]);
          setDataToShow2([]);
          for (let i = 0; i < 10; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        } else if (activePage2 === pagesNb) {
          setPagesNb2(parseInt(res.data.length / 10 + 1));
          setData2([]);
          setDataToShow2([]);
          for (let i = activePage2 * 10 - 10; i < res.data.length; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        } else {
          setPagesNb2(parseInt(res.data.length / 10 + 1));
          setData2([]);
          setDataToShow2([]);
          for (let i = activePage * 10 - 10; i < activePage * 10; i++) {
            setData2(data2 => [...data2, res.data[i]]);
            setDataToShow2(dataToShow2 => [...dataToShow2, res.data[i]]);
          }
        }
        setFullData2(res.data)
      });
  };

  useEffect(() => {
    fetchData();
  }, [activePage, activePage2]);

  const changePagePlus = table => {
    table === "collections"
      ? setActivePage(activePage + 1)
      : setActivePage2(activePage2 + 1);
  };

  const changePageMoins = table => {
    table === "collections"
      ? setActivePage(activePage - 1)
      : setActivePage2(activePage2 - 1);
  };

  const orderBy = (type, order, page) => {
    let theData = "";

    if (page === "collections") {
      theData = dataToShow;
      setDataToShow([]);
    }
    if (page === "categories") {
      theData = dataToShow2;
      setDataToShow2([]);
    }

    theData.sort((a, b) => {
      //e.log(typeof a[type]);
      if (typeof a[type] === "number") {
        if (order === "desc") return b[type] - a[type];
        else return a[type] - b[type];
      }
      if (typeof a[type] === "string") {
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

    if (page === "collections") setDataToShow(dataToShow => [...dataToShow, ...theData]);
    if (page === "categories") setDataToShow2(dataToShow2 => [...dataToShow2, ...theData]);
  };


  const reload = () => {
    setClick(!click);
    fetchData();
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const search = (table, word) => {
    if (table === "collections") {
      let theData = fullData;
      if (word !== "") {
        setDataToShow([]);

        let result = theData.filter(line =>
          line.collection_name.toUpperCase().match(`.*${word.toUpperCase()}.*`) // on compare les deux chaine mises en majuscules
        );
        setDataToShow(dataToShow => [...dataToShow, ...result]); //
      }
      else setDataToShow(data);
    }
    if (table === "categories") {
      let theData = data2;
      if (word !== "") {
        setDataToShow2([]);
        let result = theData.filter(line =>
          line.category_name.toUpperCase().match(`.*${word.toUpperCase()}.*`)
        );
        setDataToShow2(dataToShow2 => [...dataToShow2, ...result]);
      }
      else setDataToShow2(data2);
    }
  };

  return (
    <>
      {clickView ? (<> <ReturnButton onClickSee={isClickedSee} /> <Encarts /> </>) :
        click ? (<> <ReturnButton onClickSee={isClickedModidy} /> </>) : (
          <>
            <Encarts title="Liste des collections">
              <div className="tableActions border-gray">
                <SearchBar table="collections" search={search} />
                <div className="addDiv">
                  Ajouter <ButtonAdd />
                </div>
              </div>

              <Tables
                page="collections"
                orderBy={orderBy}
                donnees={dataToShow ? dataToShow : "loading"}
                deleteData={deleteData}
                onClick={isClickedModidy}
                onClickSee={isClickedSee}

              />
              <Pagination
                nbPages={pagesNb}
                activePage={activePage}
                changePagePlus={changePagePlus}
                changePageMoins={changePageMoins}
                setActivePage={setActivePage}
                table="collections"
              />
            </Encarts>

            <Encarts title="Liste des catégories">
              <div className="tableActions border-gray">
                <SearchBar table="categories" search={search} />
                <div className="addDiv">
                  Ajouter <ButtonAdd />
                </div>
              </div>

              <Tables
                page="categories"
                orderBy={orderBy}
                donnees={dataToShow2 ? dataToShow2 : "loading"}
                deleteData={deleteData}
              />
              <Pagination
                nbPages={pagesNb2}
                activePage={activePage2}
                changePagePlus={changePagePlus}
                changePageMoins={changePageMoins}
                setActivePage={setActivePage2}
                table="categories"
              />
            </Encarts> </>)}
    </>
  );
}
