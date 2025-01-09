import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MySpace from './components/my-space/MySpace';
import Error from './components/error-page/Error';

// import './profileUtility.js'

const Movies = lazy(() => import('./components/v/Movies'));
const Sidebar = lazy(() => import('./components/k/Sidebar'));
const Search = lazy(() => import('./components/k/Search'));
const Details = lazy(() => import('./components/k/Details'));
const Home = lazy(() => import('./components/s/Home'));
const Tv = lazy(() => import('./components/a/TV'));
const TVShowDetails = lazy(() => import('./components/v/TVShowDetails'));
const VideoPlayer = lazy(() => import('./components/video-payer/VideoPlayer'));

function App() {

  // navigating user to select profile if not selected.
  window.sessionStorage.getItem('profile')

  const navigatie = useNavigate()
  const location = useLocation()
  const routePath = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routePath]);
  console.log(window.sessionStorage.getItem('profile'))
  if(window.sessionStorage.getItem('profile')== null && location.pathname != '/profile'){navigatie('/profile')}

  return (
    <div className="app">
      {/* {window.sessionStorage.getItem('profile')== null && location.pathname != '/profile'?navigatie('/profile'):''} */}
      <Suspense fallback={<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100vh' }}>Loading......</h1>}>
        <Routes>
          <Route path='/video' element={<VideoPlayer />} />
          <Route path="*" element={<WithSideBar />} />
        </Routes>
      </Suspense>

    </div>
  );
}

function WithSideBar() {
  return (
    < div className='main-grid'>

      <div className="side-nav-bar">
        <Sidebar />
      </div>
      <Suspense fallback={<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100vh' }}>Loading......</h1>}>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/tvshow" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/show/:id" element={<TVShowDetails />} />
          <Route path="/profile" element={<MySpace />} />
          <Route path='/*' element={<Error />} />


          {/*
        <Route path="/details/:id" element={<Details/>}/>
       
         */}
        </Routes>
      </Suspense>


    </div>
  )
}


export default App;
