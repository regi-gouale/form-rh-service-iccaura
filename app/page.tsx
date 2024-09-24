"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Home() {
  const router = useRouter();

  function handleButtonServeClick() {
    router.push("/questions");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex justify-center justify-items-center p-8">
          <Image
            src="/imgDirectionAdmin.jpeg"
            alt="Direction Administrative ICC Lyon"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold">
          Je veux devenir un(e){" "}
          <a
            className="text-indigo-700 hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            STAR
          </a>
        </h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left">
          <li className="mb-2">Je lance le questionnaire.</li>
          <li className="mb-2">
            Je sélectionne les réponses qui me correspondent le mieux.
          </li>
          <li className="mb-2">
            J&apos;identifie le département et le ministère.
          </li>
          <li>J&apos;en discute avec les ressources humaines.</li>
        </ol>

        <div className="flex gap-4 items-center justify-center w-full flex-col sm:flex-row">
          <Button
            onClick={handleButtonServeClick}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
          >
            Je veux servir
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
