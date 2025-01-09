import React, { useState, useMemo } from 'react';
import ProfileController from './myspaceController';

const MySpaceModelControllerTester = () => {
    const [newProfile, setNewProfile] = useState({});
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    
    const profileController = useMemo(() => new ProfileController(), []);

    const handleAddNewProfile = async () => {
        if(password === cPassword){
            const timeStamp = Date.now();
            const createNewProfile = {
                id : timeStamp,
                name : name,
                password : password,
                accountType : accountType 
            }
            setNewProfile(createNewProfile);
            if(password.length >= 8 ){
                //const newestProfile = {...newProfile, id: timeStamp};
                await profileController.addProfile(createNewProfile);
                
                //setProfiles([...Profiles, newestProfile]);
                //console.log(Profiles);
                setNewProfile({});
            }
            else{
                    alert("Something is missing: \n"+newProfile);
            }
        }
    };

  return (
    <div>
        <input type='text' placeholder='Enter your name' onChange={e => setName(e.target.value)}></input>
        <input type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)}></input>
        <input type='password' placeholder='Confirm Password' onChange={e => setCPassword(e.target.value)}></input>
        <input type='text' placeholder='Account Type' onChange={e => setAccountType(e.target.value)}></input>
        <button onClick={() => handleAddNewProfile()}>Create</button>
    </div>
  )
};

export default MySpaceModelControllerTester;