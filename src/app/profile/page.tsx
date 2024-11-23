

'use server';

import ProfileInfoForm from "@/components/ProfileInfoForm";

export default async function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Profile Form */}
      <ProfileInfoForm />

      {/* Donations List */}
      <div>
        donations list ...
      </div>
    </div>
  );
}
