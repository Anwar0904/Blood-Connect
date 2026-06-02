import mongoose, { Schema, model, models } from "mongoose";

const BloodGroupSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "O-"
  label: { type: String }, // e.g., "Universal Donor"
  canGiveTo: [{ type: String }], // Array of strings like ["O-", "O+", "A+"]
  canReceiveFrom: [{ type: String }],
  description: { type: String },
}, { timestamps: true });

export default models.BloodGroup || model("BloodGroup", BloodGroupSchema);