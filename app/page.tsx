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
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-2xl">
        <div className="w-full flex justify-center justify-items-center">
          <Image
            src="/imgDirectionAdmin.jpeg"
            alt="Direction Administrative ICC Lyon"
            width={100}
            height={100}
            className="rounded-3xl"
          />
        </div>
        <h1 className="text-2xl md:text-3xl text-center font-bold">
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
        <section className="text-base text-justify md:text-lg">
          <p className="mb-2 md:mb-4">
            Bienvenue sur le formulaire d’orientation pour découvrir le
            département dans lequel vous servirez le Seigneur de manière
            épanouie, excellente et productive.
          </p>
          <p className="mb-2 md:mb-4">
            Le questionnaire consiste à mettre en évidence vos grâces, vos
            aptitudes, vos compétences, vos passions afin de vous orienter dans
            le bon service.
          </p>
          <p className="mb-2 md:mb-4">
            Il n’est pas exhaustif. C’est un canevas d’orientation.
          </p>
          <p className="mb-2 md:mb-4">
            Il est recommandé de répondre aux questions de manière spontanée.
          </p>
        </section>

        <div className="flex gap-4 items-center justify-center w-full flex-col sm:flex-row">
          <Button
            onClick={handleButtonServeClick}
            className="rounded-full border border-solid border-indigo-700/[.08] bg-indigo-700 transition-colors flex items-center justify-center hover:bg-indigo-500 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 font-semibold"
          >
            À vous de jouer !
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
