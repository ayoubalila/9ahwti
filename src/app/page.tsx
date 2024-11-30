"use client";

import { useRouter } from "next/navigation"; // Correct import

export default function Home() {
  const router = useRouter();

  return (
    <section className="max-w-lg mx-auto text-center">
      <h1 className="text-6xl font-bold">
        Fund your
        <br />
        creative work
      </h1>
      <h2 className="mt-4 mb-8">
        Accept support for your work.
        <br />
        It&apos;s easier than you think.
      </h2>
      <button
        onClick={() => router.push("/start-my-page")}
        className="bg-yellow-300 px-8 py-4 font-bold rounded-full"
      >
        Start my page
      </button>
    </section>
  );
}
