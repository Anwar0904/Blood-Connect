import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  image: { type: String },    
  role: {
    type: String,
    enum: ["admin", "volunteer", "partner", "donor", "recipient"],
    default: "donor"
  },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  cnic: { type: String, default: "" },
  age: { type: Number, default: null },
  gender: { type: String, default: "" },
  lastDonationDate: { type: Date, default: null },
  city: { type: String, required: true },
  bio: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending"
  },
  emailVerified: { type: Date, default: null }
}, { timestamps: true });

export default models.User || model("User", UserSchema);