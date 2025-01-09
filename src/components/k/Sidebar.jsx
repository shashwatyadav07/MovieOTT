import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.css'

import { AccountCircleOutlined, AccountCircle, Home, HomeOutlined, Movie, MovieOutlined, Search, SearchOutlined, Tv, TvOutlined } from '@mui/icons-material'

const Sidebar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  }
  const [prifile, setProfile] = useState('Profile');

  

  const options = [
    { icon: AccountCircleOutlined, activeIcon: AccountCircle, name: prifile, path: '/profile' },
    { icon: SearchOutlined, activeIcon: Search, name: 'Search', path: '/search' },
    { icon: HomeOutlined, activeIcon: Home, name: 'Home', path: '/' },
    { icon: TvOutlined, activeIcon: Tv, name: 'Tv', path: '/tvshow' },
    { icon: MovieOutlined, activeIcon: Movie, name: 'Movies', path: '/movies' },

  ]

  return (
    <div className='sidebar-wrapper'>
      <div className={`overlay ${showLinks ? 'overlay-visible' : ''}`}></div>

      <div className='nav-side-pane' onMouseEnter={() => setShowLinks(true)} onMouseLeave={() => setShowLinks(false)} >

        <div className='nav-icon-link'>
          {options.map((option, i) => {
            return (
              <NavLink className="nav-item" to={option.path} key={i}>
                {isActive(option.path) ? <option.activeIcon className='icon' /> : <option.icon className='icon' />}
                {showLinks && (<div className="nav-link">{option.name}</div>)}
              </NavLink>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Sidebar