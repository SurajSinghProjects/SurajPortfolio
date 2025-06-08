import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false},
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  referralCode: { type: String, required: true, unique: true },
  role: { type: String, default: "1" },
  ipAddress: { type: String, default: "" },
},
{ timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);