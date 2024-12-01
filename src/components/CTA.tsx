type CTAProps = {
    message: string;
    buttonText: string;
    buttonLink: string;
  };
  
  export default function CTA({ message, buttonText, buttonLink }: CTAProps) {
    return (
      <div className="text-center bg-yellow-300 py-8 rounded-lg shadow-md mx-4">
        <p className="text-xl font-bold mb-4">{message}</p>
        <a
          href={buttonLink}
          className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-yellow-100"
        >
          {buttonText}
        </a>
      </div>
    );
  }
  