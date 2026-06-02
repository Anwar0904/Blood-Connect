import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import UserManagementClient from "./UserManagementClient"; // Points to your client component

export const revalidate = 0; // Ensures fresh database records on admin entry view

export default async function AdministrativeUsersPage() {
  await dbConnect();

  // Pull records directly from MongoDB on the server side
  // 🚀 OPTIMIZATION: Only fetch fields displayed on the UI grid matrix using .select()
  const rawUsers = await User.find({})
    .sort({ createdAt: -1 })
    .select("_id name email role bloodGroup phone city status")
    .lean();

  // Clean serialization boundary transform safely passing data to client state
  const serializedUsers = rawUsers.map((user: any) => ({
    _id: user._id.toString(),
    name: user.name || "Anonymous User",
    email: user.email || "",
    role: user.role || "donor",
    bloodGroup: user.bloodGroup || "O+",
    phone: user.phone || "N/A",
    city: user.city || "Not Set",
    status: user.status || "pending",
  }));

  return <UserManagementClient initialUsers={serializedUsers} />;
}