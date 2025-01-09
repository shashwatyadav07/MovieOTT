import React, { useState, useEffect } from 'react';
import './UpdateProfile.css';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Switch, Typography, styled } from '@mui/material';

const ProfileSetting = ({ newProfile, setNewProfile, setNext, handleNextClick, handleAddClick }) => {
    const [isKids, setIsKids] = useState(false);
    const [isControl, setIsControl] = useState(false);
    const [agevalue, setAgeValue] = useState('adult');
    const [newName, setNewName] = useState(newProfile.name);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        setNewProfile({ ...newProfile, name: newName, isKids: isKids, isControl: isControl, age: agevalue });
    }, [isKids, isControl, agevalue, profilePic, newName]);

    const NoticeBox = styled('div')({
        display: 'none',
        background: '#aaa2',
        border: '1px solid #aaa3',
        borderRadius: '0.5rem',
        padding: '8px 20px',
        fontSize: '12px',
        width: 'max-content',
        color: '#ff0'
    });

    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePic(reader.result);
                // two lines here to add url to db
                setNewProfile({ ...newProfile, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIsKidsChange = () => {
        setIsKids((prevIsKids) => !prevIsKids);
    };
    const handleControlChange = () => {
        setIsControl((prev) => !prev);
    };
    const handleAgeChange = (event) => {
        setAgeValue(event.target.value);
    }

    // const handleNextClick = () => {
    //     setNext(true);
    //     psRef.current.style.display = "none";
    //     ppsRef.current.style.display = "display";
    //     // setNewProfile({...newProfile, name: newName, isKids: isKids, isControl: isControl, age: agevalue});
    //   }

    //   const handleAddClick = () => {
    //     setNext(false);
    //     // setNewProfile({...newProfile, name: newName, isKids: isKids, isControl: isControl, age: agevalue});
    //     // console.log(newProfile);
    //     handleUpdateProfile(newProfile);
    //     setNewProfile({});
    //     mpRef.current.style.display = "display";
    //     psRef.current.style.display = "none";
    //     ppsRef.current.style.display = "none";
    //   }
    return (
        <div className='profile-page' style={{ height: '100%' }}>
            <h3 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>{(newProfile.name !== "") ? "Edit Profile" : "Add Profile"}</h3>
            <NoticeBox style={{ display: isKids ? 'block' : 'none' }}>Please update the age bucket of the kid to enable the content as per eligibility
            </NoticeBox>
            <input
                accept="image/*"
                className='profile-pic'
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
                <IconButton component='span'>
                    <Avatar
                        src={newProfile.image} //to take image from db profile
                        style={{
                            margin: "10px",
                            width: "100px",
                            height: "100px",
                        }}
                    />
                </IconButton>
            </label>
            <p style={{ color: 'var(--color-secondary)', fontSize: '1.3rem' }}>Enter name</p>
            <input type="text" className="inputname" onChange={e => { setNewName(e.target.value) }} value={newName} placeholder='Enter Name'></input>

            <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: isKids ? 'var(--color-secondary)' : '#ff6', fontSize: '1.2rem' }}>Adults</Typography>
                <Switch sx={{ '& .MuiSwitch-track': { background: '#aaa' }, }} color="default" onClick={handleIsKidsChange} />
                <Typography sx={{ color: isKids ? '#ff6' : 'var(--color-secondary)', fontSize: '1.2rem' }}>Kids</Typography>
            </Stack>
            {isKids ?
                <></> :
                <><p style={{ color: 'var(--color-secondary)', fontSize: '1.3rem' }}>Enable Parental Controls?</p>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ color: isControl ? 'var(--color-secondary)' : '#ff6', fontSize: '1.2rem' }}>No</Typography>
                        <Switch sx={{ '& .MuiSwitch-track': { background: '#aaa' }, }} color="default" onClick={handleControlChange} />
                        <Typography sx={{ color: isControl ? '#ff6' : 'var(--color-secondary)', fontSize: '1.2rem' }}>Yes</Typography>
                    </Stack></>}


            {isKids ? <div className='kids-age-group'>
                <FormControl>
                    <p style={{ color: 'var(--color-secondary)', fontSize: '1.3rem', alignSelf: 'center' }}>Select your age group (in years)</p>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={agevalue}
                        onChange={handleAgeChange}
                        sx={{ color: 'var(--color-secondary)' }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FormControlLabel value="under7" control={<Radio sx={{
                                '&.Mui-checked': { color: 'yellow' }
                            }} />} label="Under 7" />
                            <FormControlLabel value="under13" control={<Radio sx={{
                                '&.Mui-checked': { color: 'yellow', }
                            }} />} label="Under 13" />
                            <FormControlLabel value="under16" control={<Radio sx={{
                                '&.Mui-checked': { color: 'yellow', }
                            }} />} label="Under 16" />
                            <FormControlLabel value="under18" control={<Radio sx={{
                                '&.Mui-checked': { color: 'yellow', }
                            }} />} label="Under 18" />
                        </Stack>

                    </RadioGroup>
                </FormControl>
            </div>
                : <></>}

            {isControl || isKids ?
                <Button
                    sx={{ size: '1rem', background: '#ff0', color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#ff0' } }}
                    onClick={() => handleNextClick()}
                    variant="contained">
                    NEXT
                </Button>
                :
                <Button
                    sx={{ size: '1rem', background: '#ff0', color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#ff0' } }}
                    onClick={() => handleAddClick()}
                    variant="contained">
                    {(newProfile.name !== "") ? "SAVE" : "ADD"}
                </Button>}

        </div>
    )
}

export default ProfileSetting;