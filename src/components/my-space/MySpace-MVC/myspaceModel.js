import { openDB } from 'idb';
import profileJson from "../../../asserts/profiles.json";

const DB_NAME = 'ott_profiles';
const DB_VERSION = 1;
const OTT_STORE_NAME = 'ott';

class ProfileModel{
    async openDatabase(){
        return await openDB(DB_NAME, DB_VERSION, {
            upgrade(db){
                if(!db.objectStoreNames.contains(OTT_STORE_NAME)){
                    db.createObjectStore(OTT_STORE_NAME, { keyPath: 'id'});
                }
            }
        });
    }

    // async checkIfAnyEntry(){
    //     const db = await this.openDatabase();
    //     //console.log("DB has opened");
    //     const tx = db.transaction(OTT_STORE_NAME, 'readwrite');
    //     //console.log("TX initialized");
    //     const store = tx.objectStore(OTT_STORE_NAME);
    //     //console.log("store is initialized");
    //     const re = store.getAll();

    //     if((await re).length === 0){
    //         console.log(profileJson);
    //         for(let i = 0; i < profileJson.profiles.length; i++){
    //             store.add(profileJson.profiles[i]);
    //         }
    //     }
    // }

    async addProfile(profile){
        console.log(profile);
        const db = await this.openDatabase();
        const tx = db.transaction(OTT_STORE_NAME, 'readwrite');
        const store = tx.objectStore(OTT_STORE_NAME);        
        await store.add({...profile});
        await tx.done;
    }

    async getAllProfiles(){
        //console.log("getAllProfiles");
        const db = await this.openDatabase();
        //console.log("DB has opened");
        const tx = db.transaction(OTT_STORE_NAME, 'readwrite');
        //console.log("TX initialized");
        const store = tx.objectStore(OTT_STORE_NAME);
        //console.log("store is initialized");
        const re = store.getAll();

        if((await re).length === 0){
            //console.log(profileJson);
            for(let i = 0; i < profileJson.profiles.length; i++){
                store.add(profileJson.profiles[i]);
            }
        }
        
        //(await re).forEach(result => console.log(result.text));
        return re;
        //return store.getAll();
    }

    async deleteProfile(profileId){
        const db = await this.openDatabase();
        const tx = db.transaction(OTT_STORE_NAME, 'readwrite');
        const store = tx.objectStore(OTT_STORE_NAME);
        await store.delete(profileId);
        await tx.done;
    }

    async updateProfile(profile){
        const db = await this.openDatabase();
        const tx = db.transaction(OTT_STORE_NAME, 'readwrite');
        const store = tx.objectStore(OTT_STORE_NAME);
        await store.put(profile);
        await tx.done;
    }

    async getProfileFromId(id){
        const db = await this.openDatabase();
        const tx = db.transaction(OTT_STORE_NAME, 'readonly');
        const store = tx.objectStore(OTT_STORE_NAME);
        await store.get(id);
        await tx.done;
    }
}

export default ProfileModel;