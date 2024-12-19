import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import Image from "next/image";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Donation, DonationModel } from "@/models/Donation";
import DonationForm from "@/components/DonationForm";
import DonationStatus from "@/components/DonationStatus";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export const revalidate = 0; // Disable caching for real-time data fetching

export default async function ProfilePage({ params }: Props) {
  const { username } = await params; // Ajout de `await` pour résoudre le type `Promise`

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({ username });

  if (!profileInfoDoc) {
    return <div>404 - Profile Not Found</div>;
  }

  // Fetch donations for this user
  const donations: Donation[] = await DonationModel.find({ paid: true, email: profileInfoDoc.email });

  return (
    <div>
      {/* Donation Status */}
      <DonationStatus />

      {/* Profile Cover Image */}
      <div className="w-full h-48">
        <Image
          src={profileInfoDoc.coverUrl}
          width={2048}
          height={2048}
          alt="cover image"
          className="object-cover object-center h-48"
        />
      </div>

      {/* Profile Details */}
      <div className="max-w-2xl px-2 mx-auto relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 overflow-hidden rounded-xl border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl}
              width={256}
              height={256}
              alt="avatar image"
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">{profileInfoDoc.displayName}</h1>
            <h2 className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCoffee} />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        {/* Profile Bio */}
        <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
          <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
          <p>{profileInfoDoc.bio}</p>
        </div>

        {/* Donations and Donation Form */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Donations Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">Recent Supporters:</h3>
            {!donations.length && <p>No recent donations</p>}
            {donations.length > 0 && (
              <div className="mt-2">
                {donations.map((donation) => (
                  <div className="py-2" key={donation._id.toString()}>
                    <h3>
                      <span className="font-semibold">{donation.name}</span> bought you{' '}
                      {donation.amount > 1 ? `${donation.amount} coffees` : 'a coffee'}
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">{donation.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm email={profileInfoDoc.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
