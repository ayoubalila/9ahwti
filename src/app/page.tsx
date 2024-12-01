"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="max-w-lg mx-auto text-center">
      <h1 className="text-6xl font-bold">
      Fuel
        <br />
        Your Passion
      </h1>
      <h2 className="mt-4 mb-8">
      Share your work and connect with your supporters.
        <br />
        It&apos;s simpler than ever.


      </h2>
      <button
        onClick={() => router.push("/explore")} // Updated redirect
        className="bg-yellow-300 px-8 py-4 font-bold rounded-full"
      >
        Explore more
      </button>
    </section>
  );
}
