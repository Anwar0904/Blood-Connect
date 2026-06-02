"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * This wrapper allows all child components (like your Header)
 * to access the logged-in user's data.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}