import React from 'react'

import '../../../assets/css/admin/global.css'

const SearchBar = () => {
  return (
    <div>
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <input type="text" className="form-control bg-light small border-dark mt-2" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
      </form>
    </div>
  )
}

export default SearchBar