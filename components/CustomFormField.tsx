"use client";
import React from "react";
import Image from "next/image";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Field } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: formFieldProp;
}) => {
  switch (props.fieldType) {
    case FormFieldTypes.INPUT: {
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSource && (
            <Image
              height={24}
              width={24}
              className="ml-2"
              src={props.iconSource}
              alt={props.iconAlt || "ICON"}
            />
          )}

          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    }

    case FormFieldTypes.PHONE_INPUT: {
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="PK"
            placeholder={props.placeholder}
            international
            className="input-phone"
            onChange={field.onChange}
          />
        </FormControl>
      );
    }

    default:
      break;
  }
};

type formFieldProp = {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSource?: string;
  iconAlt?: string;
  disabled?: boolean;
  daateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
};
const CustomFormField = (props: formFieldProp) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
