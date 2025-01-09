import movieData from '../../asserts/moviesData.json'
import ImageCard, { PImageCard, TVShowCard } from './ImageCard';
import HSlider from './HSlider';
import TopCrousal from './TopCrousal';
import { styled } from '@mui/material';
import VideoPlayer from './VideoPlayer';




function Movies() {

    return (
        <div className="movies" style={{ width: '100%', overflow: 'hidden' }}>

            {/* <VideoPlayer/> */}
            {/* <TVShowCard/> */}

            <TopCrousal />

            <MainContainer >
                <HSlider name='Similar Movies'>
                    {movieData.Movies.slice(0, 15).map((movie, index) => (<ImageCard movie={movie} key={index} />))}
                </HSlider>

                <HSlider name='Trending Movies'>
                    {movieData.Movies.slice(15, 39).map((movie, index) => (<PImageCard movie={movie} key={index} />))}
                </HSlider>

                <HSlider name='Recent Movies'>
                    {movieData.Movies.slice(40, 55).map((movie, index) => (<ImageCard movie={movie} key={index} />))}
                </HSlider>

                <HSlider name='Vintage Movies'>
                    {movieData.Movies.slice(56, 70).map((movie, index) => (<PImageCard movie={movie} key={index} />))}
                </HSlider>

                <HSlider name='Latest Movies'>
                    {movieData.Movies.slice(0, 15).map((movie, index) => (<ImageCard movie={movie} key={index} />))}
                </HSlider>
            </MainContainer>


        </div>
    );
}

const MainContainer = styled('div')({
    transform: 'translateY(-80px)',
    position:'relative',
    zIndex: 1,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--theme-color) 8%, var(--theme-color) 100%)',

})

export default Movies;
