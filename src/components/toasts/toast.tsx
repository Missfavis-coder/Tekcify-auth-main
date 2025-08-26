"use client";

import { useAuth } from "@/authContexts/context";

export default function Toast() {
  const { successMessage } = useAuth();

  if (!successMessage) return null;

  return (
    <div className="fixed top-4 right-4 bg-purple-700 text-white px-6 py-3 rounded shadow-lg z-50 animate-slide-in">
      {successMessage}
    </div>
  );
}
