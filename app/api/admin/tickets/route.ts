import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// Dynamic model definition for the "contacts" collection
const Contact = mongoose.models.Contact || mongoose.model("Contact", new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  type: { type: String, default: "Enquiry" }, 
  priority: { type: String, default: "Medium" }, 
  status: { type: String, default: "New" }, 
  adminReply: { type: String, default: "" } // Stored response text field
}, { timestamps: true }), "contacts");

// 1. PUT: UPDATE STATUS TICKET
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing identity reference or status update payload." }, { status: 400 });
    }

    const updatedTicket = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedTicket) {
      return NextResponse.json({ error: "Target communication log not located." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedTicket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Pipeline execution error." }, { status: 500 });
  }
}

// 2. POST: SAVE ADMIN RESPONSE AND MARK RESOLVED
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { id, responseMessage } = await req.json();

    if (!id || !responseMessage) {
      return NextResponse.json({ error: "Incomplete ticket ID or response data provided." }, { status: 400 });
    }

    // Update status to Resolved and save the response natively inside the collection document
    const resolvedTicket = await Contact.findByIdAndUpdate(
      id, 
      { status: "Resolved", adminReply: responseMessage }, 
      { new: true }
    );

    return NextResponse.json({ success: true, data: resolvedTicket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Database execution failure." }, { status: 500 });
  }
}