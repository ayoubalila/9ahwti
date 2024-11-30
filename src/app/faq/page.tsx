export default function FAQPage() {
    const faqs = [
      {
        question: "What is 9ahwty?",
        answer:
          "9ahwty is a platform that allows creators to receive support from their fans, helping them fund their creative projects.",
      },
      {
        question: "How does 9ahwty work?",
        answer:
          "Creators sign up, create a page, and share it with their audience. Fans can then support them by making contributions.",
      },
      {
        question: "Is 9ahwty free?",
        answer:
          "Signing up and creating a page is free. A small transaction fee is applied to each contribution to cover platform costs.",
      },
    ];
  
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h1>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  