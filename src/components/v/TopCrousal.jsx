
import { styled } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'

import img1 from '../../asserts/img1.jpg'
import img2 from '../../asserts/img2.jpg'
import img3 from '../../asserts/img3.jpg'
import img4 from '../../asserts/img4.jpg'
import img5 from '../../asserts/img5.jpg'

import { ImageSlider } from './HSlider'
import DetailsV from './DetailsV'
import movieData from '../../asserts/moviesData.json'

function TopCrousal() {
    const images = [img1, img2, img3, img4, img5]
    const [selectedImg, setSelectedImg] = useState(0)


    useEffect(() => {
        let scroll = setTimeout(() => {
            setSelectedImg(images.length - 1 == selectedImg ? 0 : selectedImg + 1)
        }, 3000);
        return () => clearTimeout(scroll);

    }, [selectedImg])

    return (
        <>

            <ContainerBox>
                <img src={images[selectedImg]} alt="img1" />
                <OverlayBox>
                    <div> 
                        <DetailsV movie={movieData.Movies[ selectedImg]}/>
                    </div>

                    <div className='test' style={{ width: '60%', height: 'max-content', position: 'relative', top: '65%', margin: '0 auto', overflow: 'hidden', }}>
                        <ImageSlider  >
                            {images.map((img, index) => (<img key={index} className={index == selectedImg ? 'active' : ''} src={img} onClick={() => { setSelectedImg(index) }} />))}
                        </ImageSlider></div>
                </OverlayBox>
            </ContainerBox>


        </>
    )
}

export default TopCrousal



export const ContainerBox = styled('div')({
    position: 'relative',
    width: '100%',
    maxHeight: '100vh',

    ' >img': {
        width: '100%',
        'aspect-ratio': '16/9',
        'object-fit': 'cover',

    }

})
export const OverlayBox = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    // alignItems: 'center',
    // justifyContent:'space-evenly',
    gap: '10px',
    background: '#0005',
    // background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 4%, rgba(0,0,0,0.3) 100%)',

})

const CrousalSLider = styled(ImageSlider)({
    width: '70%',
    height: 'max-content',
    position: 'relative',
    top: '60%',
    margin: '0 auto'

})