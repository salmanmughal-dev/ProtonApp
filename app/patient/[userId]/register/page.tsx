// "use client";
import RegisterForm from "@/components/forms/RegisterForm";
import { SearchParamProps } from "@/interfaces";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container h-[1000vh] max-w-full">
          <div className="flex gap-4 items-center justify-center">
            <Image
              src="/assets/icon.jpg"
              alt="logo...."
              height={1000}
              width={1000}
              className="mb-12 h-[80px] w-fit rounded-full mt-8"
            />
            <div className="text-2xl">Proton Next App</div>
          </div>
          {/* Make this component client as this part needs user interaction */}
          <RegisterForm user={user} />
          <p className="justify-items-end mt-10 text-dark-600 xl:text-left">
            © 2024 Proton Powered by Next Typescript Shadcn
          </p>
        </div>
      </section>

      <Image
        height={1000}
        width={1000}
        src={"/assets/register.jpg"}
        alt="Onboarding Screen...."
        className="side-img !h-[120vh] max-w-[30%]"
      />
    </div>
  );
};

export default Register;
