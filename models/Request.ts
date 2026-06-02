import mongoose, { Schema, model, models } from "mongoose";

const RequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isUrgent: { type: Boolean, default: false },
    patientName: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    unitsRequired: { type: Number, required: true, default: 1 },
    requiredByDate: { type: Date, required: true },
    hospitalName: { type: String, required: true },
    city: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    additionalInfo: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Request || model("Request", RequestSchema);