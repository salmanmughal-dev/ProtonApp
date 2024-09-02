import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SearchParamProps } from "@/interfaces";
import { OTPAdmin } from "@/components/otp/OTPAdmin";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP verifcation Modal */}
      {isAdmin && <OTPAdmin />}
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
          {/* Make this component client as this part needs user interaction */}
          <PatientForm />

          <div className="text-14-regular mt-20 flex items-center justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Proton Powered by Next Typescript Shadcn
            </p>
            <Link href="/?admin=true" className="text-green-700 text-2xl">
              Admin
            </Link>
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
