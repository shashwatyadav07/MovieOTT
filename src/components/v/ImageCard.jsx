import React from 'react'
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton } from '@mui/material'
import { Add, PlayArrow } from '@mui/icons-material'
import { styled } from '@mui/material/styles';

import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';



function ImageCard({ movie }) {

    const card = useRef()
    const cardInfo = useRef()

    const mainCardWidth = 216;
    const hoverCardWidth = 240;


    function onCardMouseEntered() {

        const cardRect = card.current?.getBoundingClientRect();
        // console.log(cardRect);
        const viewportWidth = window.innerWidth;

        //find nearest parent element with position relative.
        let element = card.current.parentElement
        while (element?.nodeName) {
            if (getComputedStyle(element)?.position === 'relative') break;
            element = element.parentElement;
        }
        let em = element?.getBoundingClientRect().left;



        // Calculate the adjusted left position
        let left = (cardRect.left - 10 - em) < 0 ? 0 : cardRect.left - 10 - em;

        // substracting the left side gap from the viewwidth.


        if (cardRect.left + cardInfo.current.offsetWidth > viewportWidth) {
            left = viewportWidth - cardInfo.current.offsetWidth;
        }

        // Calculating the right and adjusting left based on right.
        let right = viewportWidth - left - hoverCardWidth - em;
        if (right < 0) {
            left = left - right < 0 ? 0 : left + right;
        }

        // Calculate the adjusted top position
        let top = card.current.offsetTop

        top = (cardRect.top - 80) < 0 ? top - cardRect.top : top - cardRect.height / 2;

        cardInfo.current.style.left = left + 'px';
        cardInfo.current.style.top = top + 'px';

        cardInfo.current.style.display = 'block';

    }

    function onCardMouseLeaved() {
        if(cardInfo.current !=null)
        cardInfo.current.style.display = 'none';
    }



    return (

        <Box className='card-container' sx={{ flex: '0 0 auto', width: 'max-content', '&:hover': { '.card-info': { position: 'absolute', } } }}
            onMouseEnter={() => { onCardMouseEntered() }}
            onMouseLeave={() => { onCardMouseLeaved() }}
            ref={card}>
            <Card className='main-card' sx={{ width: mainCardWidth, backgroundColor: 'var(--theme-color)', cursor: 'pointer', border: '1px solid #aaa3' }}>
                <CardMedia component={'img'}
                    sx={{
                        width: '100%',
                        aspectRatio: 16 / 9
                    }}
                    image={movie?.Poster}
                    title={movie?.Title}
                />
                {/* {console.log(movie)} */}
            </Card>
            <Typography component={'div'} variant='h5' sx={{ overflow: 'hidden', display: '-webkit-box', '-webkit-line-clamp': '1', 'line-clamp': '1', '-webkit-box-orient': 'vertical', width: mainCardWidth, overflow: 'hidden', fontSize: 16, margin: '8px 1px' }} >
                {movie?.Title}
            </Typography>


            {/* hovering effect */}
            <Card className='card-info' sx={{ zIndex: 9, maxWidth: hoverCardWidth, backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px #aaa5', display: 'none', border: '1px solid #aaa5' }} ref={cardInfo}>
                <HoveringCard movie={movie} />
            </Card>

        </Box>

    )
}


export function PImageCard({ movie }) {
    const card = useRef()
    const cardInfo = useRef()

    const mainCardWidth = 132;
    const hoverCardWidth = 240;

    function onCardMouseEntered() {

        const cardRect = card.current.getBoundingClientRect();
        // console.log(cardRect);
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        //find nearest parent element with position relative.
        let element = card.current.parentElement
        while (element?.nodeName) {
            if (getComputedStyle(element).position === 'relative') break;
            element = element.parentElement;
        }
        let em = element?.getBoundingClientRect().left;

        // Calculate the adjusted left position

        let left = (cardRect.left - 50 - em) < 0 ? 0 : cardRect.left - 50 - em;
        if (cardRect.left + cardInfo.current.offsetWidth > viewportWidth) {
            left = viewportWidth - cardInfo.current.offsetWidth;
        }

        // substracting the left side gap from the viewwidth.



        // Calculating the right and adjusting left based on right.
        let right = viewportWidth - left - hoverCardWidth - em;
        if (right < 0) {
            left = left - right < 0 ? 0 : left + right;
        }

        // Calculate the adjusted top position
        let top = card.current.offsetTop;
        top = (cardRect.top - 80) < 0 ? top - cardRect.top : top - cardRect.height / 4;

        // setting top and left values
        cardInfo.current.style.left = left + 'px';
        cardInfo.current.style.top = top + 'px';


        cardInfo.current.style.display = 'block';

    }

    function onCardMouseLeaved() {
        if(cardInfo.current != null )
        cardInfo.current.style.display = 'none';
    }



    return (
        <Box className='card-container' sx={{ flex: '0 0 auto', width: 'max-content', '&:hover': { '.card-info': { position: 'absolute', } } }}
            onMouseEnter={() => { onCardMouseEntered() }}
            onMouseLeave={() => { onCardMouseLeaved() }}
            ref={card}>
            <Card className='main-card' sx={{ width: mainCardWidth, backgroundColor: 'var(--theme-color)', cursor: 'pointer', border: '1px solid #aaa3' }}
            >
                <CardMedia component={'img'}
                    sx={{
                        width: '100%',
                        aspectRatio: 2 / 3
                    }}
                    // image="https://placehold.co/200x300"
                    // title="green iguana"
                    image={movie?.Poster}
                    title={movie?.Title}
                />
            </Card>



            {/* hovering effect */}
            <Card className='card-info' sx={{ zIndex: '9', maxWidth: hoverCardWidth, backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px #aaa5', display: 'none', border: '1px solid #aaa5' }} ref={cardInfo}>
                <HoveringCard movie={movie} />
            </Card>

        </Box>
    )
}


const HoveringCard = ({ movie }) => {
    const navigate = useNavigate();
    const handleWatchClick = () => {
        navigate('/video');
    };

    return (
        <>

            <NavLink to={`/details/${movie.serialNo}`}>
                <CardMedia component={'img'}
                    sx={{
                        width: '100%',
                        aspectRatio: 16 / 9
                    }}
                    // image="https://placehold.co/1600x900"
                    // title="green iguana"
                    image={movie?.Poster}
                    title={movie?.Title}
                />
            </NavLink>


            <CardContent sx={{ color: '#fff', padding: '5px', ' :last-child': { paddingBottom: 1 } }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr max-content',
                    width: '100%',
                    padding: '5px 3px',
                    gap: '10px',

                }}>
                    <PlayButton onClick={handleWatchClick} variant="contained" startIcon={<PlayArrow />} sx={{ background: '#fff9' }}>
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
                <Typography component={'div'} variant='h5' sx={{ fontSize: 15, margin: '8px 1px' }} >
                    {movie?.Year} • {movie?.Runtime} • {movie?.Rated}
                </Typography>
                <Typography component={'div'} variant='p' sx={{ overflow: 'hidden', display: '-webkit-box', '-webkit-line-clamp': '3', 'line-clamp': '3', '-webkit-box-orient': 'vertical', color: '#fff9', fontSize: 12, margin: '8px 1px' }} >
                    {movie?.Plot}
                </Typography>
            </CardContent>
        </>
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

export function TVShowCard({ show }) {
    return (
        <TVCard>
            <CardMedia component={'img'}
                sx={{
                    height: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '4px',
                    width: 'max-content',
                }}
                // image="https://placehold.co/200x300"
                // title="green iguana"
            image={show?.Poster}
            title={show?.Title}
            />

            <div style={{display:'grid',  padding:'8px 16px', gap:'4px' }} >
            <Typography component={'div'} variant='p' sx={{ fontSize: 16,  }} >
                    {show.Title}
                </Typography>
                <Typography component={'div'} variant='p' sx={{ fontSize: 15,  }} >
                    {'S1 E123'} •  {'22 Feb 2024'} • {'22Min'}
                </Typography>
                <Typography component={'div'} variant='p' sx={{ overflow: 'hidden', display: '-webkit-box', '-webkit-line-clamp': '2', 'line-clamp': '2', '-webkit-box-orient': 'vertical',height:'max-content', color: '#fff9', fontSize: 12, }} >
                    {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores mollitia molestiae, sequi hic quidem repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores mollitia molestiae, sequi hic quidem repudiandae!'} 
                </Typography>
            </div>
        </TVCard>
    )
}

const TVCard = styled(Card)({
    height: '120px',
    display: 'flex',
    backgroundColor: 'var(--theme-color)',
    cursor: 'pointer',
    border: '1px solid #aaa3',
    margin: '4px',
    color: 'var(--primary-color)',

})


export default ImageCard
export { PlayButton }