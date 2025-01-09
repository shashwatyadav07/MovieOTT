import { Button, Typography, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import InputField from './InputField';

function ProfilePinSetter({pin, setPin, handleSubmitClick}) {

    // const [pin, setPin] = useState('');
    const [cPin, setCPin] = useState('');

    useEffect(() => {
        setPin(pin);
    },[]);
    
    return (
        <div className='profile-container'>
            <div className="title-line" style={{ padding: '10px', fontSize: '18px' }}>Parental Control</div>
            <ContentBox className="content-box" >
                <NoticeBox className="notice-box">You can change this setting anytime from your app settings.</NoticeBox>
          
                <Typography component={'div'} sx={{ color: 'var(--color-secondary)', fontSize: 14, }} >
                    Setup a 4 digit PIN that will be asked while using any non Kids profile.
                </Typography>

                <InputField updatePin={setPin} />

                <Typography component={'div'} sx={{ color: 'var(--color-secondary)', fontSize: 14, }} >
                    Confrim 4 digit PIN
                </Typography>

                <InputField updatePin={setCPin} className={(pin?.length === 4 && cPin?.length === 4 && pin !== cPin) ? 'error' : ''} />

                {(pin?.length === 4 && cPin?.length === 4 && pin !== cPin) ?
                    <Typography component={'p'} sx={{ color: '#f00', fontSize: 14, }} > PIN doesn't match. </Typography> : ""}


                <CustomButton variant='contained' disabled={!(pin?.length === 4 && cPin?.length === 4 && pin === cPin)} onClick={handleSubmitClick}>Submit</CustomButton>


            </ContentBox>



        </div>
    )
}

const ContentBox = styled('div')({
    margin: '50px 0 0 ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
})
const NoticeBox = styled('div')({
    background: '#aaa2',
    border: '1px solid #aaa3',
    borderRadius: '0.5rem',
    padding: '8px 20px',
    fontSize: '12px',
    width: 'max-content',
    color: '#ff0'
})
const CustomButton = styled(Button)({
    backgroundColor: '#ff0',
    color: 'var(--theme-color)',
    padding: '5px 30px',
    '&[disabled],&:disabled': {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--theme-color)'
    },
    '&:hover':{
        backgroundColor: '#ff0',
        boxShadow: '0 0 10px #ff04'
    }
})
export default ProfilePinSetter;