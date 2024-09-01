import Image from "next/image";

import { AppointmentForm } from "@/appointment/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/interfaces";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icon.jpg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit rounded-full"
          />
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />
          <p className="copyright mt-10 py-12">© 2024 ProtonApp</p>
        </div>
      </section>

      <Image
        src="/assets/appointment.jpg"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[40%] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
