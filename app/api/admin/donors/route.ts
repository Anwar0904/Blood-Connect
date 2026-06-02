import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// UPDATE USER STATUS (Approve / Verify)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required query payload identifiers." }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: status }, // e.g. "Verified"
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Target donor document could not be located." }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Mutation pipeline failure." }, { status: 500 });
  }
}

// REMOVE USER FROM REGISTRY
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing document deletion targeted id." }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "Target donor already dropped or missing." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Donor profile dropped successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Deletion pipeline failure." }, { status: 500 });
  }
}