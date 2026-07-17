import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // We leave these blank initially. The user can fill them out later in their Profile dashboard.
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  role: { type: String, default: 'customer' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);