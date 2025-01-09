import React from 'react'
import './details.css';
import { Box, IconButton, Button, styled } from '@mui/material';
import { PlayArrow, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function DetailsV({ movie }) {
  // console.log(movie)
  const genresArray = movie?.Genre?.split(',').map(word => word.trim());
  const navigate =  useNavigate();

  const handleWatchClick = () => {
    navigate('/video');
};


  return (

    <div className='movies_details_container'>
      <h1>{movie?.Title}</h1>

      <div className='movie_details'>
        <ul>
          <li>{movie?.Year}</li>
          <li>{movie?.Seasons?.length>0 ? movie?.Seasons?.length + ' Seasons' : movie?.Runtime}</li>
          <li><span className='rating_tag_v'>{movie?.Rated}</span></li>
        </ul>
        <p className='movie_plot_v'>{movie?.Plot}</p>
        <p className='genres_v'>{genresArray?.join('  |  ')}</p>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr max-content',
          width: '100%',
          padding: '5px 3px',
          gap: '10px',

        }}>
          <PlayButton variant="contained" onClick={handleWatchClick} startIcon={<PlayArrow />} sx={{ background: '#fff9' }}>
            watch Now
          </PlayButton>

          <IconButton aria-label="add" size="small" sx={{
            color: '#eee',
            border: '1px solid #ccc5',
            borderRadius: '5px',
            '&:hover': { boxShadow: '0 0 3px #aaa' }
          }}>
            <Add fontSize="medium" color='#fff9' />
          </IconButton>
        </Box>
      </div>
    </div>
  )
}


const PlayButton = styled(Button)({
  '&, &:hover, &:focus': {
    backgroundColor: '#ccc',
    color: 'black'
  },
  ' &:hover, &:focus': {
    boxShadow: '0 0 3px #aaa'
  }
})


export default DetailsV