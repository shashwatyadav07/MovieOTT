import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import React, { useRef } from 'react';
import { Paper, Typography } from "@mui/material";
import "./MultipleItemsCarousel.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function MultipleItemsCarousel({DataItems, name, url}){

    const navigate = useNavigate();

    // const hoverStyle = {
    //     display: 'none',
    //     position: 'absolute',
    //     height:'100%',
    //     width:'60px',
    //     cursor:'pointer', 
    //     top: 0, 
    //     backgroundColor: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0, 0, 0, 0) 100%)',
    //     justifyContent: 'left', 
    //     padding: '10px', 
    //     display: 'flex', 
    // }

    const carouselRef = useRef(null);
    const CItems = DataItems.map((item, index) =>(
        <Paper key={item.serialNo}
            className="Paper"
            sx={{
                position:"relative",
                justifyContent: "center",
                alignItems:"center",
                height: "240px",
                width: "165px",
                display: "flex",
                borderRadius: "3px",
                justifySelf: "center",
                margin: 1
            }}
            elevation={10}
            >
                
                    <img className="CItemsPoster" onClick={() => {navigate(`${url}/${index}`)}}  src={item.Poster} alt={"Poster of "+item.Title}/>
                
        </Paper>
    ));

    const handlePrevClick = () => {
        if(carouselRef.current){
            carouselRef.current.slidePrev();
        }
    };
    const handleNextClick = () => {
        if(carouselRef.current){
            carouselRef.current.slideNext();
        }
    };

    const responsive = {
        0: {items: 1},
        600: {items: 3},
        1024: {items: 7},
    }
  return (
    <div style={{ position: 'relative', }} className="Coursel">
        <Typography component={'div'} variant='h6' sx={{ margin: '5px', color: '#fff' }}>{name}</Typography>
        <AliceCarousel
        items={CItems}
        responsive={responsive}
        disableButtonsControls={true}
        disableDotsControls={true}
        renderDotsItem={false}
        autoPlayInterval={5000}
        infinite={true}
        autoPlay={true}
        ref={carouselRef}
        />
            <div className="ArrowNavBackP">
                <button onClick={handlePrevClick} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'left', alignSelf: 'center' }}><ArrowBackIos/></button>
            </div>
            <div className="ArrowNavBackN">
                <button onClick={handleNextClick} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'right', alignSelf: 'center' }}><ArrowForwardIos/></button>
            </div>
    </div>
  );
}

export default MultipleItemsCarousel;