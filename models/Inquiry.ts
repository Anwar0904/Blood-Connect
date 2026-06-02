import mongoose, { Schema, model, models } from "mongoose";

const InquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Enquiry", "Issue"], 
    default: "Enquiry" 
  },
  priority: { 
    type: String, 
    enum: ["Low", "Medium", "High", "Critical"], 
    default: "Medium" 
  },
  status: { 
    type: String, 
    enum: ["New", "In-Progress", "Resolved"], 
    default: "New" 
  },
}, { timestamps: true });

export default models.Inquiry || model("Inquiry", InquirySchema);