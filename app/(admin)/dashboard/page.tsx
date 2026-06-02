import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Donation from "@/models/Donation";
import RequestModel from "@/models/Request";
import DashboardKPIs from "@/components/Dashboard/DashboardKPIs";
import DonorRegistrySection from "@/components/Dashboard/DonorRegistrySection";
import RegionalUrgencySection from "@/components/Dashboard/RegionalUrgencySection";

// Kept your component type casting wrappers intact
const DashboardKPIsComponent = DashboardKPIs as any;
const RegionalUrgencySectionComponent = RegionalUrgencySection as any;
const DonorRegistrySectionComponent = DonorRegistrySection as any;

export const revalidate = 0; // Ensures data is real-time on page refresh

export default async function Page() {
  await dbConnect();

  const targetCitiesList = ["Peshawar", "Lahore", "Islamabad", "Karachi"];

  // 🚀 OPTIMIZATION 1: Run ALL independent queries in parallel using Promise.all
  // This executes everything concurrently instead of blocking the thread line-by-line
  const [
    activeRequestsCount,
    pendingUsersCount,
    totalDonationsCount,
    rawUrgencyRequests,
    rawRecentDonors,
    calculatedRegionalLoad
  ] = await Promise.all([
    // KPIs
    RequestModel.countDocuments({ status: "pending" }),
    User.countDocuments({ status: "pending", role: "donor" }),
    Donation.countDocuments(),

    // Real-time Critical Requests (Optimized with projection select)
    RequestModel.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("_id bloodGroup patientName hospitalName hospital urgencyLevel createdAt")
      .lean(),

    // Recent Donors Registry (🚀 OPTIMIZATION 2: Added .select() to stop fetching heavy user data we don't display)
    User.find({ role: "donor" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id name bloodGroup city status lastDonationDate cnic")
      .lean(),

    // Regional Loads (🚀 OPTIMIZATION 3: Grouped city sub-queries into the same parallel thread)
    Promise.all(
      targetCitiesList.map(async (city) => {
        const count = await RequestModel.countDocuments({ 
          city: new RegExp(`^${city}$`, "i"), 
          status: "pending" 
        });
        return { city, count };
      })
    )
  ]);

  // --- CLEAN SERIALIZATION BOUNDARY ---
  const serializedUrgencyRequests = rawUrgencyRequests.map((req: any) => ({
    id: req._id.toString(),
    group: req.bloodGroup,
    patient: req.patientName,
    hospital: req.hospitalName || req.hospital || "Not Specified",
    time: req.createdAt ? calculateTimeAgo(new Date(req.createdAt)) : "Just now",
    level: req.urgencyLevel || "Critical"
  }));

  const serializedRecentDonors = rawRecentDonors.map((donor: any) => ({
    id: donor._id.toString(),
    name: donor.name,
    group: donor.bloodGroup,
    location: donor.city,
    status: donor.status || "Pending",
    lastDonation: donor.lastDonationDate ? calculateTimeAgo(new Date(donor.lastDonationDate)) : "Never",
    cnic: donor.cnic || "Not Provided"
  }));

  return (
    <div className="space-y-20 py-10">
      <DashboardKPIsComponent 
        activeRequests={activeRequestsCount} 
        pendingAudits={pendingUsersCount} 
        totalMatches={totalDonationsCount} 
      />
      <hr className="my-20 border-border" />
      <RegionalUrgencySectionComponent 
        urgencyRequests={serializedUrgencyRequests} 
        regionalLoad={calculatedRegionalLoad} 
      />
      <hr className="my-20 border-border" />
      <DonorRegistrySectionComponent initialDonors={serializedRecentDonors} />
      <hr className="my-20 border-border" />
    </div>
  );
}

// Inline helper function for processing human-readable relative time metrics
function calculateTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) return `${interval}y ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}mo ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m ago`;
  return "Just now";
}