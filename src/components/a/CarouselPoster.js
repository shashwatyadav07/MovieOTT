import { Paper } from "@mui/material";
import React, {useState} from 'react';
import playImg from "./CarouselPosterAssets/play_btn.svg";
import plusImg from "./CarouselPosterAssets/plus_btn.svg";
import Carousel from "react-material-ui-carousel";
//import {ColorExtractor} from 'react-color-extractor';
import './CarouselPosterAssets/CarouselPoster.css'

  
const PosterCoursel = ({ moviesItems }) => {
// const [backColors, setBackColors] = useState([]);
const [moviesData, setMoviesData] = useState([...moviesItems])

// const handleColors = (colorPalette, index) => {
//         const newBackColors = [...backColors];
//         const domi = colorPalette[0];
//         newBackColors[index] = domi.join(',');
//         setBackColors();
// };

    return (
        <div className="carouselContainer">
            <Carousel className='carousel'
                animation='slide'
                indicators={true}
                timout={500}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                cycleNavigation={true}
                fullHeightHover={false}
                sx={{
                    width: "100%",
                    height: "110%",
                    flexGrow: 1,
                    margin: "auto",
                    mt: 5,
                }}>
                {moviesData.map((movie, index) => (
                    <div key={movie.serialNo}>
                        {/* <ColorExtractor getColors={(res) => handleColors(res, index)}/> */}
                        {/*console.log(backColors[index])*/}
                        {console.log(movie.Backdrop)}
                        <div className='content-container' style={{paddingLeft: "6px", paddingTop: "6px"}}>
                            <CarouselPosterHolder movie={movie}/>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

const CarouselPosterHolder = ({movie}) => {
  return (
        <div className="posterHolder">
            <Paper className="Paper"
                sx={{
                    position:"relative",
                    color: "#fff",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    justifyContent: "center",
                    alignItems:"center",
                    justifySelf: "center",
                    height: "400px",
                    width: "99%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    justifySelf: "center",
                    p: 2,
                }}
                elevation={10}
                >   
                <div className="allHolder">
                    <div className="CarouselPosterBack" >
                        <img className="back" src={movie.Backdrop} alt={"Backdrop background of: "+movie.Title}/>
                        <div className="logo-cont">
                            <img className="logoImg" src={movie.Logo} alt={movie.Title} />
                        </div>
                        <div className="card-buttons">
                            <WatchNowBtn onClick={() => { }} />
                            <PlusBtn onClick={() => { }} />
                        </div>
                        {/* <div className="logo">
                            <img src={movie.Logo} alt={movie.Title} />
                        </div> */}
                    </div>
                    {/* <div className="cardHolder">
                        <MovieCard movie={movie}/>
                    </div> */}
                    
                </div>
                </Paper>
        </div>  
    );
}


function ImgButton({ name, icon, color, children, ...props }) {
    return (
        <button className={name} style={{ backgroundColor: color }} {...props}>
            <img src={icon} alt='btn'/>
            {children}
        </button>
    );
}

const WatchNowBtn = ({ ...props }) => (
    <ImgButton name={"watchBtn"} icon={playImg} {...props}>
        Watch Now
    </ImgButton>
);

const PlusBtn = ({ ...props }) => (
    <ImgButton name={"plusBtn"} icon={plusImg} color={"#0008"} {...props} />
);


export default PosterCoursel;