import React, { useEffect, useState } from 'react'
import { ContainerBox, OverlayBox } from './TopCrousal'
import DetailsV from './DetailsV'
import tvShowData from '../../asserts/tvShow.json'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material'
import ImageCard, { PImageCard, TVShowCard } from './ImageCard'
import HSlider from './HSlider'


function TVShowDetails() {
    const { id } = useParams()
    const tvShow = tvShowData?.shows[id];
    const [season, setSeason] = useState(0);
    // useEffect(() => {
    //     window.scrollTo({ top: 0 });
    // }, [id])

    return (
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <ContainerBox sx={{ overflow: 'hidden' }}>
                <img src={window.location.origin + tvShow.Backdrop} alt="img1" />
                <OverlayBox>
                    <div>
                        <DetailsV movie={tvShow} />
                    </div>
                </OverlayBox>
            </ContainerBox>

            <SeasonsContainer className="seasons-container">
                <menu>
                    {tvShow?.Seasons.map((_, i) => (
                        <li className={season == i ? 'active' : ''} key={i} onClick={() => setSeason(i)}>Season {i + 1} </li>
                    ))}
                </menu>
                <HSlider>
                    {tvShow.Seasons[season].map((show, index) => (<ImageCard movie={show} key={index} />))}
                </HSlider>



            </SeasonsContainer>
        </div>
    )
}

const SeasonsContainer = styled('div')({
   
    transform: 'translateY(-80px)',
    position:'relative',
    zIndex: 1,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--theme-color) 80px, var(--theme-color) 100%)',

    '& menu': {
        listStyleType: 'none',
        display: 'flex',
        gap: '10px',
        padding: '10px',
        position: 'sticky',
        top: 0,
        background:'transperent',
       
        boxShadow: '0px 2px 1px #fff2',

        '>li': {
            padding: '10px',
            cursor: 'pointer',
            '&.active': {
                borderBottom: '2px solid var(--color-primary)'
            }
        }

    }
})


const MainContainer = styled('div')({
    transform: 'translateY(-80px)',
    position:'relative',
    zIndex: 1,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--theme-color) 8%, var(--theme-color) 100%)',

})

export default TVShowDetails