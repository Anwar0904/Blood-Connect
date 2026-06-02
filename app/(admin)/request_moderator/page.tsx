import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";
import RequestModeratorClient from "./RequestModeratorClient";

export const revalidate = 0; // Force direct server evaluation on each request

export default async function Page() {
  await dbConnect();

  // Pull all records to allow instant client side sub-filtering
  const rawRequests = await RequestModel.find({})
    .sort({ createdAt: -1 })
    .lean();

  const serializedRequests = rawRequests.map((req: any) => ({
    id: req._id.toString(),
    patient: req.patientName || "Unknown Patient",
    group: req.bloodGroup || "O-",
    hospital: req.hospitalName || req.hospital || "Not Specified",
    urgency: req.urgencyLevel || (req.status === "pending" ? "Critical" : "Stable"),
    // Mapping model properties standardizing case variances safely for tab checks
    status: req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "Pending", 
  }));

  return <RequestModeratorClient initialRequests={serializedRequests} />;
}