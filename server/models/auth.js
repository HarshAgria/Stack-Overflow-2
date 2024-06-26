import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, },
    about: {type: String},
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now},
    profilePicture: { type: String },
    answers: { type: Number, default: 0 },
    loginHistory: [{
        timestamp: { type: Date, default: Date.now },
        ip: String,
        browser: String,
        os: String,
        device: String
      }], 
    resetToken: String,
    resetTokenExpiration: Date,
    points: { type: Number, default: 0 }, 
    badges: { type: [String], default: [] } 
});

export default mongoose.model("User", userSchema);