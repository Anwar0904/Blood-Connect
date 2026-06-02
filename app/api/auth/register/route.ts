import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

// IMPORTANT: Use a named export for POST. Do NOT use "export default"
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const { 
      name, 
      email, 
      password, 
      role, 
      bloodGroup, 
      phone, 
      city 
    } = body;

    // 1. Basic Security Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Please fill in all required fields." }, 
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "An account with this email already exists." }, 
        { status: 400 }
      );
    }

    // 3. Hash the password using our lib/auth utility
    const hashedPassword = await hashPassword(password);

    // 4. Create the User in MongoDB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "donor", // Default to donor if not provided
      bloodGroup,
      phone,
      city,
      status: role === "admin" ? "verified" : "pending", // Admins are auto-verified
    });

    return NextResponse.json(
      { message: "User registered successfully!", userId: newUser._id }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("REGISTRATION_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." }, 
      { status: 500 }
    );
  }
}