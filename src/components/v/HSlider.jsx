import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { useState, useRef, } from "react";



export default function HSlider({ name, children, ...props }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const slider = useRef();



    const scrollLeft = () => {
        // const slider = document.getElementById('slider');
        slider.current.scrollLeft -= 500; // Adjust the scroll distance as needed
        setScrollPosition(oldValue => oldValue - 500);
    };

    const scrollRight = () => {
        // const slider = document.getElementById('slider');
        slider.current.scrollLeft += 500; // Adjust the scroll distance as needed
        setScrollPosition(oldValue => oldValue + 500);
    };

    return (

        <>

            <Typography component={'div'} variant='h6' sx={{ margin: '5px' }}>{name}</Typography>
            <ContainerBox>
                <LeftBtn className="arrows" style={{ 'visibility': scrollPosition < 0 ? 'hidden' : 'visible' }} onClick={scrollLeft}> < ArrowBackIos /> </LeftBtn>

                <Slider id='slider' ref={slider}>
                    {children}
                </Slider>

                <RightBtn className="arrows" onClick={scrollRight}>< ArrowForwardIos /></RightBtn>
            </ContainerBox>
        </>
    )
}


export function ImageSlider({ children }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const slider = useRef();
    const imgwidth = 100;


    const scrollLeft = () => {
        // const slider = document.getElementById('slider');
        slider.current.scrollLeft -= 100; // Adjust the scroll distance as needed
        setScrollPosition(oldValue => oldValue - 500);
    };

    const scrollRight = () => {
        // const slider = document.getElementById('slider');
        slider.current.scrollLeft += 100; // Adjust the scroll distance as needed
        setScrollPosition(oldValue => oldValue + 500);
    };


    return (
    <ContainerBox>
        <LeftBtn className="arrows"  onClick={scrollLeft}> < ArrowBackIos /> </LeftBtn>

        <CrosoulSlider ref={slider}>
            {children}

        </CrosoulSlider>

        <RightBtn className="arrows" onClick={scrollRight}>< ArrowForwardIos /></RightBtn>
    </ContainerBox>
    )
}

const ContainerBox = styled('div')({
    position: 'relative',
    width: '100%',
    margin: '10px  auto ',

    ':hover': {
        '.arrows': {
            display: 'flex'
        }
    },

    /* Width */
    '& ::-webkit-scrollbar': {
        width: 0,
        display:'none',
    },

    /* Track */
    '& ::-webkit-scrollbar-track': {
        background: 'transparent',
        width:0,
        display:'none'
    },

    /* Handle */
    '& ::-webkit-scrollbar-thumb': {
        background: 'transparent',
        width:0,
        display:'none',
    },

})

const Slider = styled('div')({
    display: 'flex',
    flex: 'no-wrap',
    gap: '7px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    padding: '0 10px'
})


const ArrowBtn = styled('span')({
    position: 'absolute',
    top: 0,
    display: 'none',
    // visibility: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    // display: 'flex',
    // backgroundColor: '#0008',
    color: '#fff',
    fontSize: '24px',
    padding: '10px',
    cursor: 'pointer',
    height: '100%',
    width: '60px',
    zIndex: 20,
})

const RightBtn = styled(ArrowBtn)({
    right: 0,
    background: 'linear-gradient(270deg, var(--theme-color) 0%, rgba(0,0,0,0.0) 100%)'
})

const LeftBtn = styled(ArrowBtn)({
    left: 0,
    background: 'linear-gradient(90deg, var(--theme-color) 0%, rgba(0,0,0,0.0) 100%)'
})

const CrosoulSlider =styled(Slider)({
    padding: '0 25px', 
    ' >img':{
        width:'85px',
        'aspect-ratio':'16 / 9',
        border:'1px solid #aaa6',
        borderRadius: '4px',
        flex: '0 0 auto',
        cursor:'pointer',

        '&.active':{
            border: '2px solid white'
        }
    }
})