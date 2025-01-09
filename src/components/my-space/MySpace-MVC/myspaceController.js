import ProfileModel from "./myspaceModel";

class ProfileController{
    constructor(){
        this.profileModel = new ProfileModel();
    }

    async addProfile(profile){
        await this.profileModel.addProfile(profile);
    }

    async getAllProfiles(){
        return await this.profileModel.getAllProfiles();
    }

    async deleteProfile(profileId){
        await this.profileModel.deleteProfile(profileId);
    }

    async updateProfile(profile){
        await this.profileModel.updateProfile(profile);
    }

    //Use this to retrieve the data for the session, using session's id.
    async getProfileFromId(id){
        return await this.profileModel.getProfileFromId(id);
    }
}

export default ProfileController;