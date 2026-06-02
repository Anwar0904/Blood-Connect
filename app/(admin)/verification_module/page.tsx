import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VerificationClientPage from "./VerificationClientPage"; // Points to your client component

export const revalidate = 0; // Ensures fresh analytical log extractions on each hit

export default async function Page() {
  await dbConnect();

  // Explicitly targets accounts needing human review (e.g. status "Pending" or "Flagged")
  const pendingUsers = await User.find({ status: { $in: ["Pending", "pending", "Flagged", "flagged"] } })
    .sort({ createdAt: 1 }) // First-in, first-out configuration
    .lean();

  const serializedQueue = pendingUsers.map((user: any) => ({
    id: user._id.toString(),
    name: user.name || "Unnamed Account",
    type: user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : "Donor",
    city: user.city || "Unknown Location",
    date: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : "Recent Log",
  }));

  return <VerificationClientPage initialQueue={serializedQueue} />;
}