"use server";
import { CreateUserParams } from "@/interfaces";
// @ts-ignore
import { ID, Query, InputFile } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: any) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    if (identificationDocument) {
      const promise = storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        identificationDocument
      );

      promise.then(
        function (response) {
          console.log("Successfully done", response); // Success
        },
        function (error) {
          console.log("There is an error occured please see"); // Failure
        }
      );
    }
    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
