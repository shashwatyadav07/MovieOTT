import React, { useState } from 'react'
import './Search.css'
// import {FaSearch} from "react-icons/fa"
import { useGlobalContext } from './context'
import { PImageCard } from '../v/ImageCard'

import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const { movies, searchInput, setSearchInput, getMovies } = useGlobalContext();

  const [input, setInput] = useState(null)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getMovies();
      setInput(searchInput);
    }
  }
  return (
    <div className='search-page-container
    '>
      <div className='search-bar-container'>
        <div className='input-wrapper'>
          <SearchIcon id="search-icon" />
          <input type="text" placeholder='Movies, shows and more'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown} />
        </div>
      </div>
      <div className="result-parent">
        {movies.length > 0 ? <p className='heading'>Top Results</p> :input===null?<></>:<p className='heading' >No Results Found</p> }
        <div className='result-posters'>
          {movies.map((movie, index) => (
            <PImageCard key={index} movie={movie} />
          ))}
        </div>
      </div>


    </div>
  )
}

export default Search