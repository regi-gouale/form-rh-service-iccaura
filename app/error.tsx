"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold">
          Désolé, une erreur s&apos;est produite.
        </h1>
        <Link className={buttonVariants()} href={"/"}>
          Retour à l&apos;accueil
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
