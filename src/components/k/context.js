import React, { useContext, useState, useEffect } from 'react';
import moviesData from '../../asserts/moviesData.json'

const AppContext= React.createContext();
const AppProvider=({children})=>{
    const [movies,setMovies]=useState([]);
    const[isLoading,setIsLoading]=useState(true)
    const[searchInput,setSearchInput]=useState(null);
const getMovies=()=>{
    setIsLoading(true);
 try{
    const results=moviesData.Movies.filter(movie=>
        typeof movie.Title==='string' &&
        movie.Title.toLowerCase().includes(`${searchInput}`.toLowerCase())
        );
        if(results){
            setMovies(results);
            setIsLoading(false);
        }
        
 }catch(error){
    console.log(error)
 }

}
useEffect(()=>{
    getMovies()
 },[])

    return <AppContext.Provider value={{movies,searchInput,setSearchInput,getMovies,isLoading}}>
        {children}
    </AppContext.Provider>
}
const useGlobalContext=()=>{
    return useContext(AppContext);
}

export {AppContext, AppProvider,useGlobalContext};