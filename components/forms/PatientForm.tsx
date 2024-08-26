"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import userFormSchema from "@/zodSchema/userFormSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setIsLoading(true);
    const { name, email, phone } = values;

    try {
      const user = { email, name, phone };
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Asslam Alaikum ! 🙂</h1>
          <p className="text-dark-700">Schedule your appointment !</p>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Salman Mughal"
          iconSource="assets/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldTypes.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="salman@mail.com"
          iconSource="assets/mail.svg"
          iconAlt="mail"
        />

        <CustomFormField
          fieldType={FormFieldTypes.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="034511111111"
          iconSource="assets/mail.svg"
          iconAlt="mail"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
