import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import BloodGroupClientPage from "./BloodGroupClientPage";

export const revalidate = 0; // Completely disables caching for instant dashboard responsiveness

const DETERMINISTIC_BLOOD_TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

export default async function Page() {
  await dbConnect();

  // Explicitly mapping type back into the local runtime instance schema definition
  const BloodGroupConfig = mongoose.models.BloodGroupConfig || mongoose.model("BloodGroupConfig", new mongoose.Schema({
    type: String,
    label: String,
    can_give: [String],
    can_receive: [String],
    population: String
  }), "blood_group_configs");

  // Fetch configs sorted by creation order
  const configurations = await BloodGroupConfig.find({}).sort({ createdAt: 1 }).lean();

  const serializedData = configurations.map((config: any, index: number) => {
    // Resolve type checking from database properties, falling back to sequential index maps if absent
    const fallbackType = DETERMINISTIC_BLOOD_TYPES[index] || `N/A-${index}`;
    const cleanType = config.type || config.blood_group || fallbackType;

    return {
      id: config._id ? config._id.toString() : `auto-gen-${index}`,
      type: cleanType,
      label: config.label || `${cleanType} Classification`,
      can_give: Array.isArray(config.can_give) ? config.can_give : [],
      can_receive: Array.isArray(config.can_receive) ? config.can_receive : [],
      population: config.population || "0%",
    };
  });

  return <BloodGroupClientPage initialData={serializedData} />;
}