import { Gender } from "@/interfaces";

export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  //   {
  //     image: "/assets/female_doctor.svg",
  //     name: "Fizza Shah Nuerologist",
  //   },
  //   {
  //     image: "/assets/male_doctor.svg",
  //     name: "Bilal Javed Cardiologist",
  //   },
  //   {
  //     image: "/assets/male_doctor.svg",
  //     name: "Ahsen Arif Psychiatrist",
  //   },
  //   {
  //     image: "/assets/female_doctor.svg",
  //     name: "Mira Anwar Dermatologist",
  //   },
  //   {
  //     image: "/assets/male_doctor.svg",
  //     name: "Evan Peter ETL",
  //   },
  //   {
  //     image: "/assets/male_doctor.svg",
  //     name: "Jane Powell Radiologist",
  //   },
  //   {
  //     image: "/assets/female_doctor.svg",
  //     name: "Alex Ramirez Dentist",
  //   },
  // ];

  {
    image: "/assets/female_doctor.svg",
    name: "Faiza Shah Neurologist",
  },
  {
    image: "/assets/male_doctor.svg",
    name: "Bilal Javed Cardiologist",
  },
  {
    image: "/assets/male_doctor.svg",
    name: "Ahsan Arif Psychiatrist",
  },
  {
    image: "/assets/female_doctor.svg",
    name: "Mira Anwar Dermatologist",
  },
  {
    image: "/assets/male_doctor.svg",
    name: "Evan Peter ENT Specialist",
  },
  {
    image: "/assets/male_doctor.svg",
    name: "Jean Paul Radiologist",
  },
  {
    image: "/assets/female_doctor.svg",
    name: "Alex Ramirez Dentist",
  },
];

export const StatusIcon = {
  scheduled: "/assets/check.svg",
  pending: "/assets/pending.svg",
  cancelled: "/assets/cancelled.svg",
};
