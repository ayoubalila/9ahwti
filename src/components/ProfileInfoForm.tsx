'use client';
import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "@/components/UploadButton";
import { ProfileInfo } from "@/models/ProfileInfo";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  profileInfo: ProfileInfo | null;
};

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl || null);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl || null);

  async function handleFormAction(formData: FormData) {
    await saveProfile(formData);
    toast.success("Profile saved!");
  }

  return (
    <form action={handleFormAction}>
      <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt="cover image"
            width={1024}
            height={1024}
            className="w-full h-48 object-cover object-center rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No cover image</span>
          </div>
        )}
        <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
          <div className="rounded-lg size-24 overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={120}
                height={120}
                className="rounded-lg"
              />
            ) : (
              <div className="size-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No avatar</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl} />
          </div>
          <input type="hidden" name="avatarUrl" value={avatarUrl || ''} />
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl || ''} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label" htmlFor="usernameIn">
            username
          </label>
          <input
            defaultValue={profileInfo?.username}
            name="username"
            id="usernameIn"
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">
            display name
          </label>
          <input
            defaultValue={profileInfo?.displayName}
            name="displayName"
            id="displayNameIn"
            type="text"
            placeholder="display name"
          />
        </div>
      </div>
      <div>
        <label className="input-label" htmlFor="bioIn">bio</label>
        <textarea
          defaultValue={profileInfo?.bio}
          id="bioIn"
          name="bio"
          placeholder="bio"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg flex gap-2 items-center">
          <FontAwesomeIcon icon={faSave} />
          Save profile
        </button>
        <button
          className="mt-4 bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg flex gap-2 items-center"
          onClick={() => signOut()}
          type="button"
        >
          Logout
        </button>
      </div>
    </form>
  );
}
