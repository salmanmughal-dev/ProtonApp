import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex gap-4">
            <Image
              src="/assets/icon.jpg"
              alt="logo...."
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit rounded-full"
            />
            <div className="text-2xl">Proton</div>
          </div>
        </div>
      </section>
    </div>
  );
}
