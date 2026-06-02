import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// UPDATE USER VERIFICATION STATUS
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, action } = await req.json(); // action: "approve" | "reject"

    if (!id || !action) {
      return NextResponse.json({ error: "Missing identity reference or action tag." }, { status: 400 });
    }

    let updatedUser;
    if (action === "approve") {
      updatedUser = await User.findByIdAndUpdate(
        id,
        { status: "Verified" },
        { new: true }
      );
    } else {
      // Rejects downgrade state tags back down to Flagged or Suspended status boundaries
      updatedUser = await User.findByIdAndUpdate(
        id,
        { status: "Flagged" },
        { new: true }
      );
    }

    if (!updatedUser) {
      return NextResponse.json({ error: "Target registration file not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Security pipeline execution failure." }, { status: 500 });
  }
}

// DELETE INVALID/MALICIOUS ACCOUNTS ENTIRELY
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing user identity reference." }, { status: 400 });
    }

    const removedUser = await User.findByIdAndDelete(id);
    if (!removedUser) {
      return NextResponse.json({ error: "Profile already dropped or invalid reference." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Registration purged from queue storage." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Purge execution pipeline failure." }, { status: 500 });
  }
}