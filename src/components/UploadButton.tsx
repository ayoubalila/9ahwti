import { uploadToCloudinary } from "@/actions/uploadActions";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";

export default function UploadButton({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  async function upload(ev: ChangeEvent<HTMLInputElement>) {
    const target = ev.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        console.error("Invalid file type:", file.type);
        alert("Only JPEG, PNG, and GIF files are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        console.error("File size too large:", file.size);
        alert("File size must be less than 5MB.");
        return;
      }

      const formData = new FormData();
      formData.set("file", file);

      try {
        const result = await uploadToCloudinary(formData);
        if (result.url) {
          onUploadComplete(result.url);
        } else {
          throw new Error("Failed to upload file.");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error uploading file:", error.message);
          alert(`File upload failed: ${error.message}`);
        } else {
          console.error("An unknown error occurred:", error);
          alert("An unknown error occurred during file upload.");
        }
      }
    }
  }

  return (
    <label className="bg-white shadow-sm shadow-black/30 p-2 cursor-pointer rounded-lg flex gap-1 items-center">
      <FontAwesomeIcon icon={faPencil} />
      <input className="hidden" type="file" onChange={upload} />
    </label>
  );
}
