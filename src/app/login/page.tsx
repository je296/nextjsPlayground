"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  if (session) router.replace("/welcome");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex-col mx-auto py-5 max-w-lg">
      <div className="">
        <h1 className="text-center font-medium text-2xl">Login</h1>
        <form onSubmit={handleSubmit} className="mt-3">
          {error && (
            <div className="text-red-500 w-fit text-sm py-1">{error}</div>
          )}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            variant="underlined"
            color="default"
            className="block p-2 my-2"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="underlined"
            color="default"
            className="block p-2 my-2"
            type="password"
          />
          <Button
            type="submit"
            className="text-white rounded-full bg-gray-900 hover:bg-gray-800 hover:shadow-md p-2"
          >
            Sign In
          </Button>
        </form>
        <hr className="my-3" />
        <p>
          Don't have an account? go to{" "}
          <Link
            className="text-blue-300 hover:text-blue-200 underline"
            href="/register"
          >
            Register
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
