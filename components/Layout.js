import React from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="container mx-auto min-h-screen">
      <Toaster />
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
}
