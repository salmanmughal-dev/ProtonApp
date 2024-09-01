"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, getUser } from "@/lib/actions/patient.actions";
import { User } from "@/interfaces";
import { FormFieldTypes } from "./PatientForm";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";

import { ToastContainer, toast } from "react-toastify";
import {
  Doctors,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import PatientFormValidation from "@/zodSchema/patientFormSchema";
import { registerPatient } from "@/lib/actions/registerPatient";
import { convertFileToUrl } from "@/lib/utils";
import { BUCKET_ID, storage } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { debug } from "console";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isShowMedicalHistory, setIsShowMedicalHistory] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IdentificationDocumentUrl, setIdentificationDocumentUrl] =
    useState<string>("");
  const [isShowIdentification, setIsShowIdentification] =
    useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: PatientFormDefaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    const patient = {
      userId: user.$id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      birthDate: new Date(values.birthDate),
      gender: values.gender,
      address: values.address,
      occupation: values.occupation,
      emergencyContactName: values.emergencyContactName,
      emergencyContactNumber: values.emergencyContactNumber,
      primaryPhysician: values.primaryPhysician,
      insuranceProvider: values.insuranceProvider,
      insurancePolicyNumber: values.insurancePolicyNumber,
      familyMedicalHistory: values.familyMedicalHistory,
      pastMedicalHistory: values.pastMedicalHistory,
      identificationType: values.identificationType,
      identificationNumber: values.identificationNumber,
      IdentificationDocumentUrl,
    };
    const newPatient = await registerPatient(patient);

    if (newPatient) {
      router.push(`/patients/${user.$id}/new-appointment`);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {!isShowMedicalHistory && !isShowIdentification && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">Personal Information</h1>
              <p className="text-dark-700">Enter your personal information</p>
            </section>

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Salman Mughal"
              iconSource="/assets/user.svg"
              iconAlt="name"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="email"
                label="Email address"
                placeholder="johndoe@gmail.com"
                iconSource="/assets/mail.svg"
                iconAlt="email"
              />

              <CustomFormField
                fieldType={FormFieldTypes.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="(92) 3476246122"
              />
            </div>
            {/* BirthDate & Gender */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Date of birth"
              />

              <CustomFormField
                fieldType={FormFieldTypes.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {["Male", "Female", "Other"].map((option, i) => (
                        <div key={option + i} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="Village Mundair Sayedan Sialkot"
                iconSource="/assets/house.svg"
                iconAlt="house"
              />
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="software engineer"
                iconSource="/assets/occupy.svg"
                iconAlt="email"
              />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Salman Mughal"
              />
              <CustomFormField
                fieldType={FormFieldTypes.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                placeholder="(555) 123-4567"
              />
            </div>
          </>
        )}
        {isShowMedicalHistory && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">Medical Information</h1>
              <p className="text-dark-700">Enter your Medical information</p>
            </section>

            <CustomFormField
              fieldType={FormFieldTypes.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="Dr. Salim Mughal"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem
                  key={doctor.name + i}
                  value={doctor.name}
                  id={doctor.name}
                >
                  <div className="flex flex-row cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-green-400"
                    />
                    <p className="text-sm">{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Insurance Provider"
                placeholder="Sifari Insurance"
              />
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="insurance policy number"
                placeholder="#320 S211 33-ILM"
              />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Family Medical History (if any)"
                placeholder="Father had diabities"
              />
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history (if any)"
                placeholder="Suffered from high blood pressure"
              />
            </div>
          </>
        )}

        {isShowIdentification && !isShowMedicalHistory && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">Identification</h1>

              <p className="text-dark-700">
                Enter your Identification information
              </p>
            </section>

            <CustomFormField
              fieldType={FormFieldTypes.SELECT}
              control={form.control}
              name="identificationType"
              label="identification type"
              placeholder="Identification Type"
            >
              {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="identificationNumber"
              label="identification number"
              placeholder="#320 S211 33-ILM"
            />

            <CustomFormField
              fieldType={FormFieldTypes.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="identification file"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader setUrl={setIdentificationDocumentUrl} />
                </FormControl>
              )}
            />
          </>
        )}
        {!isShowIdentification && (
          <button
            onClick={() => {
              if (isShowMedicalHistory) {
                setIsShowIdentification(true);
                setIsShowMedicalHistory(false);
              } else {
                setIsShowMedicalHistory(true);
              }
            }}
            className="text-green-400 float-right text-xl"
          >
            <Image src={"/assets/Next.svg"} width={32} height={32} alt="next" />
          </button>
        )}
        {/* <SubmitButton isLoading={isLoading}>Get Started</SubmitButton> */}
        <button
          className="m-2 rounded-lg w-1/2 ml-[15vw] bg-green-500 p-2 text-white"
          onClick={() => onSubmit(form.getValues())}
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;
