import React from "react";
import {
  Stethoscope,
  Heart,
  Syringe,
  Bed,
  User2,
  BrainCircuit,
  Eye,
  Pill,
  Ambulance,
} from "lucide-react";

const colorGenerator = () => {
  // Generate a random color within the green hue range (120-180 degrees)
  const baseHue = Math.floor(Math.random() * 60) + 120;

  // Generate a random saturation and lightness within a specific range for various shades of green
  const saturation = Math.floor(Math.random() * 40) + 40; // 40-80% saturation
  const lightness = Math.floor(Math.random() * 40) + 30; // 30-70% lightness

  // Convert the HSL values to a hex color string
  const color = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  console.log(color);
  return color;
};

const Card = ({ title, value, icon }: any) => {
  const colorG = colorGenerator();
  return (
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow h-28">
      <div
        style={{
          backgroundColor: colorG,
        }}
        className={`p-4 h-full flex w-1/4 items-center justify-center`}
      >
        {icon}
      </div>
      <div className="px-4 text-gray-700">
        <h3 className="text-sm tracking-wider">{title}</h3>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );
};

const page = () => {
  const cards = [
    {
      title: "Cardiology",
      value: 20,
      icon: <Heart />,
      color: colorGenerator(),
    },
    {
      title: "Neurology",
      value: 15,
      icon: <BrainCircuit />,
    },
    {
      title: "Pediatrics",
      value: 30,
      icon: <User2 />,
    },
    {
      title: "Orthopedics",
      value: 25,
      icon: <Stethoscope />,
    },
    { title: "Radiology", value: 10, icon: <Syringe />, color: "red" },
    { title: "Oncology", value: 18, icon: <Bed />, color: "green" },

    {
      title: "Eye Care",
      value: 25,
      icon: <Eye />,
    },
    { title: "Medical Care", value: 10, icon: <Pill />, color: "red" },
    { title: "Emergency", value: 18, icon: <Ambulance />, color: "green" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8">
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
};

export default page;
