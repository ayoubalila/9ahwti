export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          About <span className="text-yellow-400">9ahwty</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          9ahwty is a platform where creativity meets opportunity. We are here to empower creators, 
          helping them connect with their supporters to turn their passion into a sustainable career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide creators with the tools and resources they need to focus on what they love.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A world where every creative talent gets the support and recognition they deserve.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Innovation, inclusivity, and community-driven success are at the heart of what we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
