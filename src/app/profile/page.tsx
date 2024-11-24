import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import ProfileInfoForm from "@/components/ProfileInfoForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const revalidate = 0; // Disable caching for dynamic data

export default async function ProfilePage() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string);

  // Get the authenticated user's session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return <div>Not logged in</div>;
  }

  // Fetch the user's profile information from MongoDB
  const email = session.user.email;
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({ email });

  // Serialize the Mongoose document into a plain object
  const profileInfo = profileInfoDoc ? JSON.parse(JSON.stringify(profileInfoDoc)) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 mt-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Your Profile</h1>
      <ProfileInfoForm profileInfo={profileInfo} />
    </div>
  );
}
