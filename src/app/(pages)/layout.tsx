import React from "react";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../Providers";

function pages({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}

export default pages;
