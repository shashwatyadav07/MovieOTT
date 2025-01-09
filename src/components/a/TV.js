import React from 'react';
import ImageCard from '../v/ImageCard';
import PosterCoursel from './CarouselPoster';
import items from './CarouselPosterAssets/MainCarousel.json'
import MultipleItemsCarousel from './MultipleItemsCarousel';
import './tv.css';
import Items from '../../asserts/moviesData.json';
import tvShows from './CarouselPosterAssets/tvShow.json';
//import tvItems from '../assets/tvShows.json'
import HSlider from '../v/HSlider';

function Tv() {
  return (
    <div className='tv-wrapper'>
      {/* {console.log(tvItems.tvShows.length)} */}
      <PosterCoursel moviesItems={items.TopMovies} />
      <div>
        <HSlider name='Latest Episodes'>
          {Items.Movies.slice(0, 20).map((movie, index) => (<ImageCard movie={movie} key={index} />))}
        </HSlider>
      </div>
      
      <div>
        <MultipleItemsCarousel DataItems={tvShows.shows} name={"Trending"} url={"/show"}/>
      </div>
      
      <div>
        <MultipleItemsCarousel DataItems={Items.Movies.slice(41, 60)} name={"As per your taste"} url={"/show"}/>
      </div>

      <div>
        <MultipleItemsCarousel DataItems={Items.Movies.slice(61, 80)} name={"Most Viewed"} url={"/show"}/>
      </div>
    </div>
  )
}

export default Tv;