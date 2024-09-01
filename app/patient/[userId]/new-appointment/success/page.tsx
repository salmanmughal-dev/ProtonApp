"use client";
import successToast from "@/toast/success";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { SearchParamProps } from "@/interfaces";
import { getAppointment } from "@/appointment/actions";
import { Appointment } from "@/interfaces/appwrite";
import DotLoader from "react-spinners/DotLoader";

const override: any = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Success = ({ searchParams, params: { userId } }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>();
  const [doctor, setDoctor] = useState<any>();
  useEffect(() => {
    setIsLoading(true);
    setTrigger(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const appointment = await getAppointment(appointmentId);
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );
      console.log(appointment);
      setAppointment(appointment);
      setDoctor(doctor);

      setIsLoading(false);
    };

    getData();

    if (trigger) successToast("Appointment Scheduled");
  }, [trigger, appointmentId]);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/" className="flex items-center gap-8">
          <Image
            src={"/assets/icon.jpg"}
            className="rounded-full"
            alt="logo"
            height={100}
            width={100}
          />
          <p>protonApp</p>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/ok.svg"
            height={200}
            width={180}
            alt="success"
            className="m-4 object-cover"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          {!isLoading ? (
            <>
              <p>Requested appointment details: </p>
              <div className="flex items-center gap-3">
                <Image
                  src={doctor?.image!}
                  alt="doctor"
                  width={100}
                  height={100}
                  className="size-6"
                />
                <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/assets/calender.svg"
                  height={24}
                  width={24}
                  alt="calendar"
                />
                <p> {String(appointment?.schedule).substring(0, 10)}</p>
              </div>
            </>
          ) : (
            <DotLoader
              color={"#36d7b7"}
              loading={isLoading}
              cssOverride={override}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patient/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 ProtonApp</p>
      </div>
    </div>
  );
};

export default Success;
