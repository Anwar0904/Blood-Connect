import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, type, label, population, can_give, can_receive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing config identity parameter payload." }, { status: 400 });
    }

    const BloodGroupConfig = mongoose.models.BloodGroupConfig || mongoose.model("BloodGroupConfig", new mongoose.Schema({}), "blood_group_configs");

    // Persist the type string straight back down alongside the tracking array metrics
    const updatedConfig = await BloodGroupConfig.findByIdAndUpdate(
      id,
      { type, label, population, can_give, can_receive },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedConfig }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Database execution failure." }, { status: 500 });
  }
}