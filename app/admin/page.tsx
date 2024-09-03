"use client";
import Image from "next/image";
import Appointments from "./appointments/page";
import AdminLayout from "./layout";
import DotLoader from "react-spinners/DotLoader";
import BarChart from "./chart";
import { CSSProperties, useEffect, useState } from "react";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const AppointmentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="flex m-5 items-center justify-around">
        {[
          { status: "Scheduled", value: 140, address: "/assets/check.svg" },
          { status: "Cancelled", value: 13, address: "/assets/close.svg" },
          { status: "Pending", value: 0, address: "/assets/mail.svg" },
        ].map((value) => (
          <>
            <a
              href="#"
              className="p-6 w-[500px] bg-white border border-green-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {value.status}
                </h5>
                <Image
                  src={value.address}
                  width={50}
                  height={50}
                  alt="image"
                  className="rounded-full"
                />
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {value.value}
              </p>
            </a>
          </>
        ))}
      </div>

      <div className="flex m-5 items-center justify-around">
        {[
          { status: "Staff", value: "100+" },
          { status: "Equipment", value: "299+" },
          { status: "Building", value: "2" },
        ].map((value) => (
          <>
            <a
              href="#"
              className="p-6 w-[500px] bg-white border border-green-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {value.status}
                </h5>
                <Image
                  src={"/assets/icon.jpg"}
                  width={50}
                  height={50}
                  alt="image"
                  className="rounded-full"
                />
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {value.value}
              </p>
            </a>
          </>
        ))}
      </div>
      <div className="m-5 mt-11 h-[50%] bg-green-100 flex justify-between">
        {isLoading ? (
          <DotLoader
            color={"#36d7b7"}
            loading={isLoading}
            cssOverride={override}
            className="!m-28 !ml-[400px]"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <BarChart />
        )}

        <div className="w-full m-4 mr-40 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10 m-8">
            <h2 className="text-2xl text-[#24AE7C] m-4">Public Favourite ⭐</h2>
            <Image
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/assets/icon.jpg"
              alt="Bonnie image"
              height={150}
              width={150}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Doctor Ayesha Aman
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Department of Psychology
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Details
              </a>
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsPage;
