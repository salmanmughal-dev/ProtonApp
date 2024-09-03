import { getAppointments } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import React from "react";
import ServerButton from "@/components/button";

const Appointments = async () => {
  const results = await getAppointments();
  console.log("hello world", results.documents);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-9">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        {" "}
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#24AE7C] dark:bg-[#1D8A61] dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Schedule Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              keyNote
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {results.documents.map((value: any) => (
            <tr
              key={value.$id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4"></td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Image
                  className="w-10 h-10 rounded-full"
                  src="/assets/appointment.jpg"
                  alt="Jese image"
                  width={50}
                  height={50}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {value.patient.name}
                  </div>
                  <div className="font-normal text-gray-500">
                    Doctor: {value.primaryPhysician}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                {String(value.schedule).substring(0, 10)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {value.status === "pending" ? (
                    <>
                      <div className="h-2.5 w-2.5 rounded-full bg-red-700 me-2"></div>{" "}
                      {value.status}
                    </>
                  ) : (
                    <>
                      <div className="h-2.5 w-2.5 rounded-full bg-[#24AE7C] me-2"></div>{" "}
                      {value.status}
                    </>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-md text-[#24AE7C] font-bold">
                  {value.reason}
                </p>
              </td>

              <td className="px-6 py-4">
                <ServerButton
                  id={value.$id}
                  schedule={value.schedule}
                  status={value.status}
                  userName={value.patient.name}
                  doctor_name={value.primaryPhysician}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-10"
      >
        Your notes for today
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
};

export default Appointments;
