"use client";
import { Status } from "@/interfaces";
import {
  getAppointments,
  updateStatus,
} from "@/lib/actions/appointment.actions";
import React, { CSSProperties, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import successToast from "@/toast/success";
import DotLoader from "react-spinners/DotLoader";
import { sendCustomEmail } from "@/messaging/email.service";
const override: CSSProperties = {
  display: "block",
  margin: "40px",
  borderColor: "red",
  // width: "100%",
};
const ServerButton = ({ id, schedule, status, userName, doctor_name }: any) => {
  const date = new Date(schedule);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long", // Get the full weekday name (e.g., Monday)
    month: "short", // Get the abbreviated month name (e.g., Feb)
    day: "numeric", // Get the day of the month as a number
    year: "numeric", // Get the year
  });
  console.log(formattedDate, doctor_name, userName);

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true); // Start loader

      const result = await updateStatus(id, "scheduled");

      if (result) {
        successToast("Appointment Confirmed"); // Show success message
        sendCustomEmail({
          to_name: userName,
          doctor_name: doctor_name,
          appointment_date: formattedDate,
        });
      }
      onCloseModal();
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating status:", error); // Log error
    }
  };
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * Opens the modal window.
   */
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <div>
            <div className="bg-dark-100 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
              <p className="text-gray-700 mb-6">Confirm this appointment</p>
              <div className="m-6">
                {isLoading ? (
                  <DotLoader
                    color="#36d7b7"
                    loading={isLoading}
                    cssOverride={override}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <Calendar
                    className="w-full bg-black text-green-700"
                    onChange={() => {}}
                    value={new Date(schedule)}
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={onCloseModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onOpenModal}
          className={`${
            status == "scheduled"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-full`}
          // disabled={status == "scheduled"}
        >
          Approve
        </button>

        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
          Cancel
        </button>
      </div>
    </>
  );
};

export default ServerButton;
