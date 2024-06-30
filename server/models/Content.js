// backend/models/Content.js
import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String },
  videoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Content", contentSchema);
