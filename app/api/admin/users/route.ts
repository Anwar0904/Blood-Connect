import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// 1. GET: Read all users from the system
export async function GET() {
  try {
    await dbConnect();
    // Fetch users sorted by latest registration first, excluding raw password hashes from query results
    const users = await User.find({}).sort({ createdAt: -1 }).select("-password").lean();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load directory." }, { status: 500 });
  }
}

// 2. POST: Handle user creation
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, role, bloodGroup, phone, city, cnic, age, gender, status } = body;

    if (!name || !email || !password || !bloodGroup || !phone || !city) {
      return NextResponse.json({ error: "Please fill out all mandatory schema fields." }, { status: 400 });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return NextResponse.json({ error: "A user account with this email already exists." }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name, email: email.toLowerCase(), password: hashedPassword, role: role || "donor",
      bloodGroup, phone, city, cnic: cnic || "", age: age ? Number(age) : null,
      gender: gender || "", status: status || "pending", emailVerified: new Date()
    });

    const { password: _, ...sanitizedUser } = newUser.toObject();
    return NextResponse.json({ success: true, data: sanitizedUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal system execution error." }, { status: 500 });
  }
}

// 3. PUT: Update an existing user's structural fields (Role or Status Modification)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, name, role, status, bloodGroup, phone, city } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing identity identification token." }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, role, status, bloodGroup, phone, city },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User account document not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Mutation execution fault." }, { status: 500 });
  }
}

// 4. DELETE: Permanently purge an identity from the database
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing identification property query parameter." }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "Target record does not exist." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User purged successfully from system." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Purge execution fault." }, { status: 500 });
  }
}