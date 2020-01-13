import React from 'react'
import '../../../assets/css/admin/global.css'

const SearchBar = (props) => {

  const handleChange = (e) => {
    props.search(props.table, e.target.value)
  }

  return (
    <div className=" searchEnd">
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <input type="text" className="form-control bg-light small border-gray" placeholder="Rechercher..." aria-label="Search" aria-describedby="basic-addon2" onChange={handleChange} />
      </form>
    </div>
  )
}

export default SearchBar