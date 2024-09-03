"use server";
import { CreateUserParams, Status } from "@/interfaces";
import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  PATIENT_COLLECTION_ID,
  users,
  APPOINTMENT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { sendCustomEmail } from "@/messaging/email.service";

export const getAppointments = async () => {
  const result = await databases.listDocuments(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!
  );
  return parseStringify(result);
};

export const updateStatus = async (documentId: any, status: Status) => {
  const result = await databases.updateDocument(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!,
    documentId,
    { status }
  );
  return parseStringify(result);
};
