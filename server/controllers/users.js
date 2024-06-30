import mongoose from "mongoose";
import users from '../models/auth.js'

export const getAllUsers = async(req,res) => {
    try {
        const allUsers = await users.find();
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({_id : users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn, profilePicture: users.profilePicture, loginHistory: users.loginHistory, points: users.points, badges: calculateBadges(users.points), email: users.email})

        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

const calculateBadges = (points) => {
    const badges = [];

    if (points >= 1000) {
        badges.push('Legendary Contributor');
    }
    if (points >= 800) {
        badges.push('Elite Contributor');
    }
    if (points >= 500) {
        badges.push('Expert Contributor');
    }
    if (points >= 250) {
        badges.push('Skilled Contributor');
    }
    if (points >= 100) {
        badges.push('Intermediate Contributor');
    }
    if (points >= 50) {
        badges.push('Novice Contributor');
    }

    return badges;
};


export const updateProfile = async (req, res) => {
    const { id:_id }=req.params;
    const {name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    try {
        let updateData = { name, about, tags };
        const updatedProfile = await users.findByIdAndUpdate(_id, updateData, { new: true });
        // const updateProfile = await users.findByIdAndUpdate( _id,
        //      { $set: { name: name, about: about, tags: tags, profilePicture: profilePicture}}, { new: true})
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message})
    }
}


export const updateProfilepic = async (req, res) => {
    const { id: _id } = req.params;
    const { profilepic } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Invalid user ID');
    }
    try {
        // let img = { profilepic };
        const updatedprofilepic = await users.findByIdAndUpdate(_id, { profilepic } , { new: true });
        if (!updatedprofilepic) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedprofilepic);
        console.log(profilepic); 
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
    // res.send('Hello, Stackoverflow-api!');
};


