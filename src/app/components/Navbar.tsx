"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Button } from "@nextui-org/button";

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
interface NavbarProps {
  session: Session | null;
}

function Navbar() {
  const { data: session } = useSession();
  console.log("🚀 ~ Navbar ~ session:", session);

  return (
    <nav className="p-5 bg-black text-white">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-medium">
          <Link href="/welcome">NextAuth</Link>
        </div>
        <ul className="flex">
          <li className="mx-3">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Avatar as={"button"} isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
