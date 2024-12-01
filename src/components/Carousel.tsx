import Image from "next/image";

type CarouselProps = {
  items: { image: string; quote: string; stats: string; name: string }[];
};

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className="flex overflow-x-scroll space-x-4 px-4">
      {items.map((item, index) => (
        <div key={index} className="min-w-[300px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <blockquote className="text-center italic mb-2">"{item.quote}"</blockquote>
          <p className="text-center text-sm font-medium text-gray-500">{item.stats}</p>
          <p className="text-center font-bold">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
