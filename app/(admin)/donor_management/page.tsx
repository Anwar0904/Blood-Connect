import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import DonorManagement from "./DonorManagementClient"; // Points to your client component

export const revalidate = 0; // Ensures database changes reflect instantly upon page reloads

export default async function Page() {
  await dbConnect();

  // Pull all records tagged with the 'donor' access role
  const rawDonors = await User.find({ role: "donor" })
    .sort({ createdAt: -1 })
    .lean();

  const serializedDonors = rawDonors.map((donor: any) => ({
    id: donor._id.toString(),
    name: donor.name || "Anonymous User",
    group: donor.bloodGroup || "A+",
    location: donor.city || "Not Specified",
    phone: donor.phone || "No Phone Line",
    status: donor.status || "Pending", // Tracks verification states cleanly
  }));

  return <DonorManagement initialDonors={serializedDonors} />;
}