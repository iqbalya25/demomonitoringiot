"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export const TabMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Function to determine if a path is active
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <Tabs value={pathname}>
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger
            value="/"
            onClick={() => router.push("/")}
            data-state={isActive("/") ? "active" : ""}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="/furnace"
            onClick={() => router.push("/furnace")}
            data-state={isActive("/furnace") ? "active" : ""}
          >
            Induction Furnace
          </TabsTrigger>
          <TabsTrigger
            value="/shotblast"
            onClick={() => router.push("/shotblast")}
            data-state={isActive("/shotblast") ? "active" : ""}
          >
            ShotBlast
          </TabsTrigger>
          <TabsTrigger
            value="/shotblastvibrate"
            onClick={() => router.push("/shotblastvibrate")}
            data-state={isActive("/shotblastvibrate") ? "active" : ""}
          >
            ShotBlast Vibrate
          </TabsTrigger>
          <TabsTrigger
            value="/lab"
            onClick={() => router.push("/lab")}
            data-state={isActive("/lab") ? "active" : ""}
          >
            Laboratory
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabMenu;
