import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import data2  from '../../asserts/moviesData.json';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const NotAvailable = 'https://placehold.co/200x300?text=Not\nAvailable'
const FetchData = ({ head }) => {

    const row_items = {
        0: {
            items: 3,
        },

        600: {
            items: 5,
        },
        800: {
            items: 6,
        },
        1024: {
            items: 7.5,
        }
    }

    const handleDragStart = (e) => e.preventDefault();
    const items = data2.Movies.slice(0,15).map(({ serialNo, name, Title, Poster }) => {
        return <Link style={{ textDecoration: 'none' }} to={`/details/${serialNo}`} state={{ serialNo, media_type: head.includes("Movies") ? "movie" : "tv" }}>
            <div className="movie">
                <img src={Poster ? Poster : NotAvailable} onDragStart={handleDragStart} alt="Not found" />
                <p>{name || Title}</p>
            </div>
        </Link>
    })

    return (
        data2.length !== 0 && <div className="home-div mx-auto">
            <h3 className="heading3">{head}</h3>

            <AliceCarousel mouseTracking items={items} responsive={row_items}
                animationType='fadeout'
                renderPrevButton={() => {
                    return <span className="navigation" style={{ left: "-2rem" }}>
                        {<NavigateBeforeIcon style={{ fontSize: "3rem", marginLeft: "20px" }} />}
                    </span>
                }}
                renderNextButton={() => {
                    return <span className="navigation" style={{ right: "-2.2rem" }}>
                        {<NavigateNextIcon style={{ fontSize: "3rem" }} />}</span>
                }}
            />
        </div>
    )
}

export default FetchData;