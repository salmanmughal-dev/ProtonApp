"use client";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ChartColumn,
  FanIcon,
  PinIcon,
  Settings,
  User2,
} from "lucide-react";

import Image from "next/image";
import DotLoader from "react-spinners/DotLoader";
import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function AdminLayout({ children }: any) {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    console.log(pathName);
  }, []);

  return (
    <div className="flex gap-8">
      <div className="w-[15%]">
        <div className="pb-12 bg-green-500 h-[100vh]">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Proton
              </h2>
              <div className="space-y-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="h-4 w-4" />
                  {pathName === "/admin" ? (
                    <div className="flex gap-2 text-dark-200">
                      <PinIcon size={18} />
                      <Link href={"/admin"}>Admin</Link>
                    </div>
                  ) : (
                    <div className="flex gap-2 hover:text-dark-200 text-white">
                      <PinIcon size={18} />
                      <Link href={"/admin"}>Admin</Link>
                    </div>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="h-4 w-4" />
                  {pathName === "/admin/appointments" ? (
                    <div className="flex gap-2 text-dark-200">
                      <PinIcon size={18} />
                      <Link href={"/admin/appointments"}>Appointments</Link>
                    </div>
                  ) : (
                    <div className="flex gap-2 hover:text-dark-200">
                      <PinIcon size={18} />
                      <Link href={"/admin/appointments"}>Appointments</Link>
                    </div>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="h-4 w-4" />
                  {pathName === "/admin/departments" ? (
                    <div className="flex gap-2 text-dark-200">
                      <PinIcon size={18} />
                      <Link href={"/admin/departments"}>Departments</Link>
                    </div>
                  ) : (
                    <div className="flex gap-2 hover:text-dark-200">
                      <PinIcon size={18} />
                      <Link href={"/admin/departments"}>Departments</Link>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Reports
              </h2>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="mr-2 h-4 w-4" />
                  <div className="flex gap-2 hover:text-dark-200">
                    <FanIcon size={18} />
                    <p>Staff</p>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="mr-2 h-4 w-4" />
                  <div className="flex gap-2 hover:text-dark-200">
                    <ChartColumn size={18} />
                    <p>History</p>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <div className="mr-2 h-4 w-4" />
                  <div className="flex gap-2 hover:text-dark-200">
                    <Settings size={18} />
                    <p>Settings</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 ml-[10%] my-[90%]">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight"></h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <div className="mr-2 h-4 w-4" />
                <div className="flex gap-2">
                  <div className="border-8 border-white rounded-full p-4">
                    <User2 size={80} />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%]">{children}</div>
    </div>
  );
}

export default AdminLayout;
