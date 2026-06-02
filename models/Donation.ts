import mongoose, { Schema, model, models } from "mongoose";

const DonationSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipientName: { 
    type: String, 
    required: true, 
    default: "System Initialization" 
  },
  hospital: { 
    type: String, 
    required: true, 
    default: "Registered as Active Lifesaver" 
  },
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  units: { 
    type: Number, 
    required: true, 
    default: 1 
  }
}, { 
  timestamps: true,
  collection: "donations" // 👈 Forces MongoDB to create a collection named exactly "donations"
});

export default models.Donation || model("Donation", DonationSchema);