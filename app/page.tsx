import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP verifcation Modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex gap-4">
            <Image
              src="/assets/icon.jpg"
              alt="logo...."
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit rounded-full"
            />
            <div className="text-2xl">Proton</div>
          </div>

          <PatientForm />

          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl: text-left">
              ProtonApp Powered by Next LinkedIn :
              https://www.linkedin.com/in/salman-mughal-full-stack-developer/
            </p>
            <Link href="/?admin=true">Admin</Link>
          </div>
        </div>
      </section>

      <Image
        height={1000}
        width={1000}
        src={"/assets/onboarding.png"}
        alt="Onboarding Screen...."
        className="side-img max-w-[30%]"
      />
    </div>
  );
}
