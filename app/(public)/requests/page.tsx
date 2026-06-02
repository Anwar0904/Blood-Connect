
import React from "react";
import RequestPulse from "@/components/BloodRequests/RequestPulse";
import RequestSection from "@/components/BloodRequests/RequestFeed";
import BloodRequestForm from "@/components/BloodRequests/RequestForm";
import ImpactStories from "@/components/BloodRequests/ImpactStories";

export default function BloodRequestsPage() {
  return (
    <div className="bg-background min-h-screen space-y-16 pb-24">
      <RequestPulse />
      <RequestSection />
      <BloodRequestForm />
      <ImpactStories />
    </div>
  );
}