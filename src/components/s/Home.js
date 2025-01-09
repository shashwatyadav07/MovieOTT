import React from 'react';
import FetchData from './FetchData';
import TopCarousel from './TopCarousel';
import './Home.css'

const Home = () => {

    return (
        <div className='home-container-wrapper'>
            <TopCarousel />
            
            <FetchData head="Upcoming Movies" />
            <FetchData head="Trending Movies" />
            <FetchData head="Top Rated Movies" />

        </div>
    );
}

export default Home;