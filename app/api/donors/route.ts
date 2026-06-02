import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Donation from "@/models/Donation";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      email,
      name,
      phone,
      cnic,
      age,
      gender,
      bloodGroup,
      city,
      lastDonationDate,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "User identity verification email is missing." },
        { status: 400 },
      );
    }

    console.log("--> RUNNING DONOR LIFECYCLE SYNC FOR EMAIL:", email);

    // Look for the user explicitly by email address
    let userDocument = await User.findOne({ email });

    if (!userDocument) {
      console.log(
        "--> TARGET MISSING. BUILDING A BRAND NEW USER DOCUMENT ROW...",
      );
      userDocument = new User({
        email,
        name: name || "Anonymous User",
        phone: phone || "Not Provided",
        bloodGroup: bloodGroup || "A+",
        city: city || "Not Provided",
      });
    }

    // Assign core profile information updates
    userDocument.name = name || userDocument.name;
    userDocument.phone = phone || userDocument.phone;
    userDocument.cnic = cnic || userDocument.cnic;
    userDocument.age = age ? Number(age) : userDocument.age;
    userDocument.gender = gender || userDocument.gender;
    userDocument.bloodGroup = bloodGroup || userDocument.bloodGroup;
    userDocument.city = city || userDocument.city;
    userDocument.role = "donor";

    if (lastDonationDate) {
      userDocument.lastDonationDate = new Date(lastDonationDate);
    }

    const savedResult = await userDocument.save();
    const userIdStr = savedResult._id.toString();
    console.log("--> USER DOCUMENT MUTATION SUCCESSFUL ID:", userIdStr);

    // FIX 1: Explicitly convert String tracking to safely typecast ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userIdStr);

    // FIX 2: Use direct validation lookup to prevent initialization race condition slips
   const existingInitializationDonation = await Donation.findOne({
  userId: userObjectId,
  recipientName: "System Initialization"
});

    if (!existingInitializationDonation) {
      console.log(
        "--> INJECTING SEPARATE INITIALIZATION DONATION RECORD ROW...",
      );

      // FIX 3: Added the missing "await" keyword so the server waits for the database before returning!
      const newDonation = new Donation({
        userId: userObjectId,
        recipientName: "System Initialization",
        hospital: "Registered as Active Life-Saver",
        date: lastDonationDate ? new Date(lastDonationDate) : new Date(),
        units: 1,
      });

      await newDonation.save();

      console.log("--> STANDALONE DONATION RECORD SUCCESSFULLY WRITTEN.");
    } else {
      console.log("--> DONATION INITIALIZATION ALREADY STAGED. SKIPPING PUSH.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Donor profile metrics successfully synchronized!",
        userId: userIdStr,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("CRITICAL ROUTE HANDLER EXCEPTION:", error.message || error);
    return NextResponse.json(
      {
        error:
          error.message || "Database synchronization execution broke down.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const donors = await User.find({ role: "donor" })
      .select("-password")
      .sort({ updatedAt: -1 })
      .lean();
    return NextResponse.json({ success: true, donors }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}
