import React from "react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Donation from "@/models/Donation";
import RequestModel from "@/models/Request"; // Ensure this matches your Request model file name
import { notFound } from "next/navigation";
import ProfileClientTabs from "./ProfileClientTabs";
import { 
  Heart, Search, MapPin, Phone, Mail 
} from "lucide-react";

interface ProfileProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfileProps) {
  const { id } = await params;

  await dbConnect();

  // 1. Fetch user base details
  const profileUser = await User.findById(id).lean();
  if (!profileUser) {
    notFound();
  }

  // 2. Fetch standalone donations and requests documents mapping to this user's ID
  const rawDonations = await Donation.find({ userId: profileUser._id })
    .sort({ date: -1 })
    .lean();

  const rawRequests = await RequestModel.find({ userId: profileUser._id })
    .sort({ createdAt: -1 })
    .lean();

  // 3. Construct a fully serialized data tree safe for Client boundary injection
  const serializedUser = {
    id: profileUser._id.toString(),
    name: profileUser.name,
    email: profileUser.email,
    role: profileUser.role,
    bloodGroup: profileUser.bloodGroup,
    phone: profileUser.phone,
    city: profileUser.city,
    bio: profileUser.bio || "",
    // Map external collection arrays into the tab layout system safely
    donations: rawDonations.map((d: any) => ({
      id: d._id.toString(),
      recipientName: d.recipientName,
      hospital: d.hospital,
      units: d.units,
      date: d.date ? new Date(d.date).toLocaleDateString() : "",
    })),
    requests: rawRequests.map((r: any) => ({
      id: r._id.toString(),
      patientName: r.patientName,
      bloodGroup: r.bloodGroup,
      hospital: r.hospitalName || r.hospital, // Standardizes variance safely
      unitsRequired: r.unitsRequired,
      status: r.status,
      date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
    })),
  };

  const isDonor = serializedUser.role === "donor";

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-16 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Card Header */}
        <div className="bg-card border border-border rounded-[2.5rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl text-white ${isDonor ? "bg-primary animate-pulse" : "bg-blue-500"}`}>
                {isDonor ? <Heart size={32} fill="currentColor" /> : <Search size={32} />}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">{serializedUser.name}</h1>
                <p className="text-muted text-xs mt-1 font-medium max-w-md italic">
                  {serializedUser.bio || "No profile bio written yet."}
                </p>
              </div>
            </div>
            
            {/* Blood Badge group */}
            <div className="flex items-center gap-3 bg-muted/20 border border-border px-5 py-3 rounded-2xl w-full sm:w-auto justify-center">
              <div className="text-center">
                <span className="text-[9px] font-black tracking-widest text-muted block uppercase">Blood Type</span>
                <span className={`text-2xl font-black ${isDonor ? "text-primary" : "text-blue-500"}`}>
                  {serializedUser.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border text-xs font-bold text-muted">
            <div className="flex items-center gap-2"><Mail size={16} className="text-primary" />{serializedUser.email}</div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-primary" />{serializedUser.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" />{serializedUser.city}</div>
          </div>
        </div>

        {/* Dynamic client rendering system tabs & fields edit */}
        <ProfileClientTabs user={serializedUser} />

      </div>
    </div>
  );
}