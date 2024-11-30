"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartMyPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, displayName, bio }),
      });

      if (!response.ok) {
        throw new Error("Failed to create your page.");
      }

      // Removed the unused 'data' variable
      alert("Page created successfully!");
      router.push(`/profile`);
    } catch (error) {
      console.error(error);
      alert("Error: Could not create your page. Please try again.");
    }
  }

  return (
    <section className="max-w-3xl mx-auto text-center mt-16 px-4">
      <h1 className="text-4xl font-bold text-gray-800">Start Your Page</h1>
      <p className="mt-6 text-gray-600">
        Create your profile, customize your page, and start connecting with your supporters.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="username" className="block text-left font-semibold text-gray-600">
            Username <span className="text-yellow-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            className="block w-full mt-2 p-2 border rounded-lg"
            placeholder="Enter your unique username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="displayName" className="block text-left font-semibold text-gray-600">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            className="block w-full mt-2 p-2 border rounded-lg"
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="bio" className="block text-left font-semibold text-gray-600">
            Bio
          </label>
          <textarea
            id="bio"
            className="block w-full mt-2 p-2 border rounded-lg"
            placeholder="Tell your supporters about yourself"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-lg w-full"
        >
          Create My Page
        </button>
      </form>
    </section>
  );
}
