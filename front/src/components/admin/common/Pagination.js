import React, {useEffect, useState} from "react";
import '../../../assets/css/admin/pagination.css'

const Pagination = (props) => {
  const [pagesNb, setPagesNb] = useState(props.nbPages);
  const [activePage, setActivePage] = useState(props.activePage);

  const createPagination = () => {
    let pages = []
    for (let i = 1; i <= pagesNb; i++) {
     pages.push(i);
    }
    return pages
  }

  const itemClick = (e) => {
    setActivePage(parseInt(e.target.innerHTML))
    props.setActivePage(parseInt(e.target.innerHTML));
    scrollToview();
  }

  useEffect(() => {
    setPagesNb(props.nbPages)
  }, [props.nbPages])
 

  const nextPage = () => {
    if (activePage < pagesNb) {
      setActivePage(activePage+1)
      props.changePagePlus(props.table);
      scrollToview();
    }
  }

  const previousPage = () => {
    if (activePage > 1) {
      setActivePage(activePage-1)
      props.changePageMoins(props.table);
      scrollToview();
    }
  }

  const scrollToview = () => {
    const theDiv = document.getElementById(props.table)
    theDiv.scrollIntoView();
  }


  return (

      <nav aria-label="Page navigation example" className="paginationEnd">
        <ul className="pagination">
          <li className={activePage === 1 ? "page-item disabled" : "page-item"}>
            <span className="page-link" aria-label="Next" onClick={previousPage}>
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
          {createPagination().map(page => (
<li key={page} className={activePage === page ? "active page-item" : "page-item"}><span className="page-link" onClick={itemClick}  value={page} >{page}</span></li>
             ))
          }
          <li className={activePage === pagesNb ? "page-item disabled" : "page-item"}>
            <span className="page-link" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
  );
}

export default Pagination