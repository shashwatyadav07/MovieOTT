import { styled } from '@mui/material'
import React from 'react'

function Error() {
  return (
    <ErrorWraper className='error-page'>
        <h2>404</h2>
     
        <h5>page not found</h5>
    </ErrorWraper>
  )
}


const ErrorWraper = styled('div')({
    width:'100%',
   margin:'100px 0',
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
    gap:'20px',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
     
})
export default Error