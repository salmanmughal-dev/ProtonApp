import { Appointment } from "./appwrite";

export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Gender = "Male" | "Female" | "Other";
export type Status = "pending" | "scheduled" | "cancelled";

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
export interface User extends CreateUserParams {
  $id: string;
}

export type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
