"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Field, Form } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

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

    case FormFieldTypes.DATE_PICKER: {
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            className="ml-2"
            src={"/assets/calender.svg"}
            alt="calenderIcon"
            width={24}
            height={24}
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              dateFormat={props.daateFormat ?? "dd/MM/yyyy"}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    }

    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldTypes.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
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
