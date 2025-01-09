import React, { useState, useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import img1 from "../../asserts/img1.jpg";
import img2 from "../../asserts/img2.jpg";
import img3 from "../../asserts/img3.jpg";
import img4 from "../../asserts/img4.jpg";
import img5 from "../../asserts/img5.jpg";


 
const TopCarousel = () => {
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(true);
  const [configState, setConfig] = useState(config.gentle);
 
  const slides = [
    
    {  content: <img src={img1} alt="1" /> },
    {  content: <img src={img2} alt="2" /> },
    {  content: <img src={img3} alt="3" /> },
    {  content: <img src={img4} alt="4" /> },
    {  content: <img src={img5} alt="5" /> },
    
    
  ].map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index) };
  });
 
  const onChangeInput = (e) => {
    setGoToSlide(parseInt(e.target.value, 10) || 0);
  };
 
  useEffect(() => {
    const interval = setInterval(() => {
      setGoToSlide((prevGoToSlide) => (prevGoToSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
 
    return () => clearInterval(interval);
  }, [slides.length]);
 
  return (
    <div style={{ 
      width: "80%", height: "300px", margin: "15px auto" }}>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showNavigation}
        animationConfig={configState}
      />
      <div
        style={{
          margin: "0 auto",
          marginTop: "2rem",
          width: "50%",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        {/* ... (input fields and configuration buttons) */}
      </div>
    </div>
  );
};
 
export default TopCarousel;