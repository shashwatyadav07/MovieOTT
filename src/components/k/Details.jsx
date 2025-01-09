import React, { useEffect, useState } from 'react'
import moviesData from '../../asserts/moviesData.json'
import { PlayButton, PImageCard } from '../v/ImageCard'
import { Box, IconButton } from '@mui/material'
import { Add, PlayArrow } from '@mui/icons-material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Details.css'
import { useGlobalContext } from './context'

import img1 from '../../asserts/img1.jpg'
import img2 from '../../asserts/img2.jpg'
import img3 from '../../asserts/img3.jpg'
import img4 from '../../asserts/img4.jpg'
import img5 from '../../asserts/img5.jpg'

import DetailsV from '../v/DetailsV'
import { ContainerBox, OverlayBox } from '../v/TopCrousal'

const images = [img1, img2, img3, img4, img5]
function Details() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null)
    const [moreResults, setMoreResults] = useState([]);
    const [genresList, setgenresList] = useState([]);
    const { isLoading } = useGlobalContext(); // u can del
    const { id } = useParams();
    const location = useLocation();
    const landposter = images[id != null | undefined | 0 ? id % images.length : 1];
    useEffect(() => {
        // console.log(location);
        const fetchData = async () => {
            try {
                const trgtmovie = moviesData.Movies.find(pmovie => pmovie.serialNo.toString() === id?.toString());

                if (!trgtmovie) {
                    // console.error('Movie not found');
                    return;
                }

                setMovie(trgtmovie);

                const genresArray = trgtmovie.Genre.split(',').map(word => word.trim());
                setgenresList(genresArray);

                const results = moviesData.Movies.slice(0, 13).filter(otherMovie => (
                    otherMovie !== trgtmovie &&
                    otherMovie.Genre &&
                    genresArray.some(genre => otherMovie.Genre.includes(genre))
                ));

                setMoreResults(results);
                if (id) {
                    window.scrollTo({ top: 0 });
                    fetchData();
                }
            } catch (error) {
                // console.error('Error fetching movie data:', error);
            }
        };

        fetchData();

    }, [id, location]);

    if (isLoading) {
        return <><h1>Loading...</h1></>
    }

    const handleWatchClick = () => {

        navigate('/videoapp2');

    };
    return (
        <div>

            <ContainerBox sx={{ overflow: 'hidden' }}>
                <img src={landposter} alt="img1" />
                <OverlayBox>
                    <div>
                        <DetailsV movie={movie} />
                    </div>

                    {/* <div className='test' style={{ width: '60%', height: 'max-content', position: 'relative', top: '65%', margin: '0 auto', overflow: 'hidden', }}>

                    </div> */}
                </OverlayBox>
            </ContainerBox>


            <h4 className="heading">More Like this</h4>
            <hr />
            <div className='more-posters'>
                {/* {moreResults.length > 0 ? moreResults.map(m => console.log(m)) : 'no result'} */}
                {moreResults.map((movie, index) => (
                    <PImageCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Details