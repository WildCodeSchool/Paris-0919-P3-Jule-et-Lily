import React, {useEffect, useState} from "react";
import '../../../assets/css/admin/pagination.css'

const Pagination = () => {
  const [pagesNb, setPagesNb] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const createPagination = () => {
    let pages = []
    for (let i = 1; i <= pagesNb; i++) {
     pages.push(i);
    }
    return pages
  }

  const itemClick = (e) => {
    setActivePage(parseInt(e.target.text))
  }

  const nextPage = () => {
    if (activePage < pagesNb) {
      setActivePage(activePage+1)
    }
  }

  const previousPage = () => {
    if (activePage > 1) {
      setActivePage(activePage-1)
    }
  }


  return (

      <nav aria-label="Page navigation example" className="paginationEnd">
        <ul className="pagination">
          <li className={activePage === 1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" href="#" aria-label="Next" onClick={previousPage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {createPagination().map(page => (
<li key={page} className={activePage === page ? "active page-item" : "page-item"}><a className="page-link" href="#" onClick={itemClick}  value={page}>{page}</a></li>
             ))
          }
          <li className={activePage === pagesNb ? "page-item disabled" : "page-item"}>
            <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
  );
}

export default Pagination