import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import AdminInboxClient from "./AdminInboxClient";

export const revalidate = 0; // Prevent stale caching layers on live communication feeds

export default async function Page() {
  await dbConnect();

  const Contact = mongoose.models.Contact || mongoose.model("Contact", new mongoose.Schema({}), "contacts");

  const rawTickets = await Contact.find({})
    .sort({ createdAt: -1 })
    .lean();

  const serializedTickets = rawTickets.map((ticket: any) => {
    // Relative human timeline calculation
    const createdDate = ticket.createdAt ? new Date(ticket.createdAt) : new Date();
    const diffInHours = Math.floor((new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60));
    const timeDisplay = diffInHours < 1 ? "Just now" : diffInHours < 24 ? `${diffInHours} hours ago` : `${Math.floor(diffInHours/24)} days ago`;

    return {
      id: ticket._id.toString(),
      type: ticket.type || "Enquiry",
      sender: ticket.name || "Anonymous Sender",
      email: ticket.email || "",
      subject: ticket.subject || "No Subject Line Provided",
      message: ticket.message || "No body description text included.",
      date: timeDisplay,
      status: ticket.status || "New",
      priority: ticket.priority || (ticket.type === "Issue" ? "High" : "Medium"),
    };
  });

  return <AdminInboxClient initialTickets={serializedTickets} />;
}