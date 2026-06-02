import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
// Make sure to point this import to your file where authOptions are defined
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function PUT(req: Request) {
  try {
    await dbConnect();

    // 1. Get current logged-in user session securely on the server side
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication session expired. Access denied." }, { status: 401 });
    }

    const currentLoggedInUserId = (session.user as any).id || (session.user as any)._id;
    const body = await req.json();
    const { id, name, phone, city, bloodGroup, bio, currentPassword, newPassword } = body;

    // 2. CRITICAL PROTECTION GATEWAY: Enforce strict profile isolation.
    // Even an Admin trying to hit this user endpoint is blocked; it only permits owners.
    if (currentLoggedInUserId !== id) {
      return NextResponse.json({ error: "Access Denied: You cannot modify another user's profile information." }, { status: 403 });
    }

    // Find user record documents
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ error: "Target user profile document does not exist." }, { status: 404 });
    }

    // 3. Optional: Secure Password Pipeline Processing Mutation
    let updatedFields: any = { name, phone, city, bloodGroup, bio };

    if (newPassword) {
      // Validate that they provided their current password to confirm ownership
      if (!currentPassword) {
        return NextResponse.json({ error: "Please enter your current password to set a new password." }, { status: 400 });
      }

      // Check if the user has an existing password (OAuth users might not)
      if (existingUser.password) {
        const matchesCurrent = await bcrypt.compare(currentPassword, existingUser.password);
        if (!matchesCurrent) {
          return NextResponse.json({ error: "The current password you entered is incorrect." }, { status: 400 });
        }
      }

      // Enforce clean minimum password parameters
      if (newPassword.length < 6) {
        return NextResponse.json({ error: "The new password must be at least 6 characters long." }, { status: 400 });
      }

      // Generate salt and hash the new password string securely
      const salt = await bcrypt.genSalt(12);
      updatedFields.password = await bcrypt.hash(newPassword, salt);
    }

    // 4. Update the profile with the verified changes
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select("-password").lean();

    return NextResponse.json({ 
      success: true, 
      message: "Profile and credentials updated successfully.", 
      user: updatedUser 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Profile mutation processing failure:", error);
    return NextResponse.json({ error: error.message || "Failed to update profile data parameters." }, { status: 500 });
  }
}