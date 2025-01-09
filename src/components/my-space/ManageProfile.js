import React from 'react';
import Avatar from "@mui/material/Avatar";
//import profileJson from "../assets/profiles.json";
import "./MySpace.css";

const ManageProfile = () => {
    return (
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
                <Avatar ref={avatarRef[index]} sx={{
                    borderRadius: "10%",
                    border: "1px white solid",
                    height: "130px",
                    width: "130px",
                    margin: "10px",
                    marginBottom: "2px",
                    fontSize: "5em"
                    }}
                    onClick={() => handleAvatarClick(profile, index)}
                    >
                    {console.log(profile.name?.charAt(0).toUpperCase())}
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
                }}>{(profile.name === "")?".": profile.name?.split(' ')[0]}</h3>
            </div>
            )
        )}
    </div>

    <div className='button-container'>
        <button className='edit-btn' onClick={() => {alert("You clicked me")}}>
            <strong>EDIT</strong>
        </button>
    </div>
  );
};

export default ManageProfile