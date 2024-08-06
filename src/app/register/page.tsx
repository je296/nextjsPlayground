"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(" ");

  const { data: session } = useSession();
  if (session) redirect("/welcome");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password doesn't match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please enter all input!");
      return;
    }

    try {
      const validateEmail = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const { data } = await validateEmail.json();
      console.log("🚀 ~ handleSubmit ~ user:", data);

      if (data) {
        setError("Email Already Registered");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("Registration Completed");
        form.reset();
      } else {
        console.log("User's Registration Failed!");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-5">
        <h3>Register</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 w-fit text-sm py-1">{error}</div>
          )}
          {success && (
            <div className="bg-green-400 text-white w-fit text-sm py-1">
              {success}
            </div>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            className="block bg-gray-300 rounded-md p-2 my-2"
            type="text"
            placeholder="Enter your name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-300 rounded-md p-2 my-2"
            type="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-300 rounded-md p-2 my-2"
            type="password"
            placeholder="Enter your password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block bg-gray-300 rounded-md p-2 my-2"
            minLength={4}
            type="password"
            placeholder="Please confirm your password"
          />
          <button
            type="submit"
            className="text-white rounded-full bg-gray-900 hover:bg-gray-700 hover:shadow-md p-2"
          >
            Sign Up
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Already have an account? go to{" "}
          <Link
            className="text-blue-300 hover:text-blue-200 underline"
            href="/login"
          >
            Login
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
