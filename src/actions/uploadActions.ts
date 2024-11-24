'use server';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error("No file provided");
    }

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    const uploadResult = await cloudinary.uploader.upload(`data:${file.type};base64,${base64File}`, {
      folder: "KAHWTI",
    });

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Cloudinary upload failed:", error.message);
    } else {
      console.error("An unknown error occurred during upload:", error);
    }
    throw error; // Ensure the error propagates back to the calling function
  }
}
