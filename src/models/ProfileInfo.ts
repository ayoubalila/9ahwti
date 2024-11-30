import { model, models, Schema } from 'mongoose';

export type ProfileInfo = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
};

const profileInfoSchema = new Schema<ProfileInfo>(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    displayName: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    coverUrl: { type: String },
  },
  { timestamps: true }
);

// Ensure `username` index does not allow null values
profileInfoSchema.index({ username: 1 }, { unique: true, sparse: false });

export const ProfileInfoModel = models?.ProfileInfo || model<ProfileInfo>('ProfileInfo', profileInfoSchema);
