import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";

// POST: Create a fresh emergency request row mapping to the active user
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      userId,
      isUrgent,
      patientName,
      bloodGroup,
      unitsRequired,
      requiredByDate,
      hospitalName,
      city,
      contactPerson,
      contactPhone,
      contactEmail,
      additionalInfo,
    } = body;

    if (!userId || !patientName || !bloodGroup || !unitsRequired || !requiredByDate || !hospitalName || !city) {
      return NextResponse.json({ error: "Required form parameters are missing." }, { status: 400 });
    }

    console.log("--> INJECTING EMERGENCY REQUEST FOR USER ID:", userId);

    const newRequest = new RequestModel({
      userId,
      isUrgent,
      patientName,
      bloodGroup,
      unitsRequired: Number(unitsRequired),
      requiredByDate: new Date(requiredByDate),
      hospitalName,
      city,
      contactPerson,
      contactPhone,
      contactEmail,
      additionalInfo,
    });

    const savedRequest = await newRequest.save();
    console.log("--> REQUEST PERSISTED SUCCESSFULLY ID:", savedRequest._id.toString());

    return NextResponse.json({
      success: true,
      message: "Emergency request broadcasted successfully!",
      requestId: savedRequest._id.toString(),
    }, { status: 201 });

  } catch (error: any) {
    console.error("REQUESTS POST API EXCEPTION:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal Execution Error" }, { status: 500 });
  }
}

// GET: Fetch all active global elements for public requests / admin dashboard feeds
export async function GET() {
  try {
    await dbConnect();
    
    // Sort so urgent requests hit the top of the stack, followed by latest entries
    const activeRequests = await RequestModel.find()
      .populate("userId", "name image email")
      .sort({ isUrgent: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, requests: activeRequests }, { status: 200 });
  } catch (error: any) {
    console.error("REQUESTS GET API EXCEPTION:", error.message || error);
    return NextResponse.json({ error: "Could not fetch requests feed." }, { status: 500 });
  }
}