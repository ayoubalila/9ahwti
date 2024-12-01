type CreatorCardProps = {
    creator: {
      name: string;
      profileImage: string;
      description: string;
      stats: { supporters: number; funds: string };
    };
  };
  
  export default function CreatorCard({ creator }: CreatorCardProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <img
          src={creator.profileImage}
          alt={creator.name}
          className="rounded-full w-16 h-16 mx-auto mb-4"
        />
        <h3 className="text-lg font-bold text-center">{creator.name}</h3>
        <p className="text-sm text-gray-600 text-center mb-4">{creator.description}</p>
        <div className="text-center text-sm text-gray-500">
          <p>Supporters: {creator.stats.supporters}</p>
          <p>Funds: {creator.stats.funds}</p>
        </div>
      </div>
    );
  }
  