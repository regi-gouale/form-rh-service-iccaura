export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold">
          Je veux servir à{" "}
          <a
            className="text-accent hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICC Au-RA
          </a>
        </h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
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
          {/* <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a> */}
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:hover:text-black"
            href="/questions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Je veux servir
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
