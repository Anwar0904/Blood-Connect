import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";

// UPDATE REQUEST STATUS MANAGEMENT
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required request parameters." }, { status: 400 });
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status: status }, // "pending", "matching", or "fulfilled"
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json({ error: "Target pipeline document not located." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedRequest }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Database mutation failure." }, { status: 500 });
  }
}