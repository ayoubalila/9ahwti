export default function ContactPage() {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Get in <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We’d love to hear from you. Whether you have a question, need support, 
            or just want to say hello, our team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Email Us
              </h2>
              <p className="text-gray-600">
                Send us an email at{" "}
                <span className="text-yellow-400 font-bold">
                  support@9ahwty.com
                </span>
                . We’ll respond within 24 hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Call Us
              </h2>
              <p className="text-gray-600">
                Reach us at{" "}
                <span className="text-yellow-400 font-bold">+1 (555) 123-4567</span>{" "}
                from 9 AM to 6 PM, Monday to Friday.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Visit Us
              </h2>
              <p className="text-gray-600">
                Find us at{" "}
                <span className="text-yellow-400 font-bold">
                  123 Creativity Street, Innovation City
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  