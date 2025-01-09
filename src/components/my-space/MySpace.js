import React, { useEffect, useMemo, useRef, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import ProfileController from "./MySpace-MVC/myspaceController";
import ProfileSetting from './UpdateProfile';
import "./MySpace.css";
import ProfilePinSetter from './PinSetter';
import {useNavigate} from "react-router-dom";
import { Edit } from '@mui/icons-material';


const MySpace = () => {
    const [Profiles, setProfiles] = useState([]);
    const [newProfile, setNewProfile] = useState();
    const [isNext, setIsNext] = useState(false);
    const [pin, setPin] = useState('');
    const mpRef = useRef(null);
    const psRef = useRef(null);
    const ppsRef = useRef(null);
    const profileController = useMemo(() => new ProfileController(), []);
    let navigate = useNavigate();

    

    useEffect(() => {
        const fetchProfiles = async () => {
            const fetchedProfiles = await profileController.getAllProfiles();
            setProfiles(fetchedProfiles);
        };

        fetchProfiles();
        // psRef.current.style.display = "none";
        // ppsRef.current.style.display = "none";
    }, [profileController]);

    useEffect(() => {
        psRef.current.style.display = "none";
    }, [isNext])

    const handleAvatarClick = (profile, index) => {
        if(profile.name !== ""){
            window.sessionStorage.setItem('profile',profile.id);
            navigate("/");
        }else{
            mpRef.current.style.display = "none";
            psRef.current.style.display = "block";
            setNewProfile(profile);
        }
    }
    
    const handleUpdateProfile = async () => {
        await profileController.updateProfile(newProfile);
    };

    const handleSubmitClick = async () => {
        console.log(newProfile);
        console.log(pin);
        const addProfile = {...newProfile, pin: pin};
        console.log("THE UPDATED PROFILE: "+JSON.stringify(addProfile));
        handleUpdateProfile(addProfile);
        setNewProfile({});     
        window.location.reload();  
    };

    const handleEditClick = (profile) => {
        setNewProfile(profile);
        mpRef.current.style.display = "none";
        psRef.current.style.display = "block";
    }

    const ManageProfile = () => {
        return(
        <>
        <div className='manage-profile' style={{
            display: "relative",
            marginLeft: "35%",
            marginTop: '2%'
        }}>
        <h3 style={{
            display: "relative",
            margin: "auto",
            color: "white"
        }}>
            Manage Profile
        </h3>
    </div>
    <div className='one-liner' style={{
            display: "relative",
            marginTop: "10px",
            margin: "20px"
        }}>
            <p style={{
                color: "white",
                margin: "auto",
                textAlign: "center"
            }}>
                You can setup up to <strong>5 profiles</strong> for your family and friends.
            </p>
        </div>
    <div className='avatar-container'
        style={{
            width: "100%",
            height: "100%",
            display: "inline-grid",
            gridTemplateColumns: "auto auto",
            alignContent: "center",
            justifyContent: "center",
            lastChild:{
                marginLeft: "50%"
            }
        }}>
        {Profiles.map((profile, index) => (
            <div className='avatar-container' key={profile.id} >
                <Avatar sx={{
                    borderRadius: "10px",
                    border: window.sessionStorage.getItem('profile')==profile.id? "2px  solid #0f0": '1px solid var(--color-secondary)',
                    position: "relative",
                    marginTop: "-20px",
                    height: "130px",
                    width: "130px",
                    margin: "10px",
                    marginBottom: "2px",
                    backgroundColor:'transparent',
                    fontSize: "5em",
                    zIndex: "0",
                    cursor: "pointer"
                    }}
                    src={profile.image}
                    onClick={() => handleAvatarClick(profile, index)}
                    >
                    {/* {console.log(profile.name?.charAt(0).toUpperCase())} */}
                    {(profile.name === "")?
                        "+" :
                        profile.name.charAt(0).toUpperCase() 
                    }
                </Avatar>
                <h3 style={{
                    marginTop: "1px",
                    marginBottom: "1px",
                    color: "white",
                    textAlign: "center"
                }}>
                    {(profile.name === "")?<span>&ensp;</span>: profile.name?.split(' ')[0]}
                </h3>
                {(profile.name !== "")?
                <Edit className='pencilBtn' style={{
                    padding: "2px",
                    height: "24px",
                    width: "24px",
                    cursor: "pointer",
                    position: "relative",
                    padding:'4px',
                    background: "var(--theme-color)",
                    top: "-99%",
                    border: "1px white solid",
                    fontSize: "25px",
                    left: "84%",
                    zIndex: "2",
                    borderRadius: "50%",
                }} onClick={() => handleEditClick(profile)}/>: ""}
            </div>
            )
        )}
    </div>
    </>
    );
}

    const handleNextClick = () => {
        setIsNext(true);
    }
    
    const handleAddClick = () => {
        setIsNext(false);
        handleUpdateProfile(newProfile);
        setNewProfile({});
        window.location.reload();
    }

  return (
    <div className='my-space-conatiner' 
        style={{
                width: 'max-content', 
                height: 'max-content', 
                display: 'block',
                position: 'relative',
                padding: "auto",
                margin: "auto",
            }}>
                {/* {console.log(newProfile)} */}
        
        <div className='profile-manange-container' ref={mpRef}>
            <ManageProfile />
        </div>
        {/* ProfileSetting = ({newProfile, setNewProfile, setNext, handleUpdateProfile}) */}
        <div className='profile-setting-container' ref={psRef}>
        {(newProfile !== undefined)?
            <ProfileSetting newProfile={newProfile} setNewProfile={setNewProfile} setNext={setIsNext} handleNextClick={handleNextClick} handleAddClick={handleAddClick}/>
        :""}
        </div>
        {/* ProfilePinSetter({newProfile, setNewProfile,  handleSubmitClick}) */}
        
        {(isNext)? 
            <div className='profile-pin-setter' ref={ppsRef}>
                <ProfilePinSetter pin={pin} setPin={setPin} setNewProfile={setNewProfile}  handleSubmitClick={handleSubmitClick} />
            </div>: 
                ""
        }
    </div>
  )
};

export default MySpace;