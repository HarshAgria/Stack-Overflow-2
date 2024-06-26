import mongoose from "mongoose";
// import { upload } from "../middlewares/multer.js";
import users from '../models/auth.js'


// Multer configuration
// const upload = multer({
//     dest: 'uploads/', // Destination directory for storing uploaded files
//     // Define filename format for uploaded files
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });

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
    const {name, about, tags, profilePicture } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }

    try {
        let updateData = { name, about, tags };
        // if (req.file) {
        //     updateData.profilePicture = req.file.path;
        // }

        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }

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
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('Invalid user ID');
    }
  
    try {
      const user = await users.findById(_id);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
    //   console.log(req.file);
    if (profilePicture) {
        user.profilePicture = profilePicture;
    }
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



