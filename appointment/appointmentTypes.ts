import { Status } from "@/interfaces";
import { Patient } from "@/interfaces/appwrite";
import { Models } from "node-appwrite";

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
