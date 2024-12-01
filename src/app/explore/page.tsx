"use client";

import Carousel from "@/components/Carousel";
import CreatorCard from "@/components/CreatorCard";
import CTA from "@/components/CTA";

export default function ExplorePage() {
  const testimonials = [
    {
      image: "/images/testimonial1.jpg",
      quote: "9ahwty helped me connect with my supporters and fund my art projects.",
      stats: "300+ supporters",
      name: "John Doe",
    },
    {
      image: "/images/testimonial2.jpg",
      quote: "This platform made it easy for me to raise funds for my startup.",
      stats: "150+ supporters",
      name: "Jane Smith",
    },
    {
      image: "/images/testimonial3.jpg",
      quote: "As a musician, 9ahwty helped me record my first album!",
      stats: "200+ supporters",
      name: "Sam Taylor",
    },
  ];

  const creators = [
    {
      name: "Alice",
      profileImage: "/images/creator1.jpg",
      description: "Digital Artist creating beautiful illustrations.",
      stats: { supporters: 120, funds: "$5,000" },
    },
    {
      name: "Bob",
      profileImage: "/images/creator2.jpg",
      description: "Musician sharing soulful melodies.",
      stats: { supporters: 200, funds: "$7,000" },
    },
    {
      name: "Charlie",
      profileImage: "/images/creator3.jpg",
      description: "Photographer capturing life's moments.",
      stats: { supporters: 180, funds: "$6,500" },
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Testimonials Section */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-bold mb-8">Success Stories</h2>
        <Carousel items={testimonials} />
      </section>

      {/* Explore Creators Section */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-3xl font-bold mb-8">Explore Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {creators.map((creator, index) => (
            <CreatorCard key={index} creator={creator} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-yellow-50">
        <CTA
          message="Join now and start supporting creators you love!"
          buttonText="Get Started"
          buttonLink="/signup"
        />
      </section>
    </div>
  );
}
