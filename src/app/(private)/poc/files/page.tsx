"use client";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { generatePresignedUrl } from "@/lib/files";

interface ImageUploaderProps {
  fetchPresignedUrl: (filename: string, contentType: string) => Promise<string>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ fetchPresignedUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      // 10MB hard limit
      setMessage("File exceeds 10MB limit.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Step 1: Compress image to max 1080x1080
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 1080,
        maxSizeMB: 10, // still enforce 10MB after compression
        useWebWorker: true,
      });

      // Step 2: Get presigned URL from server
      const presignedUrl = await fetchPresignedUrl(compressedFile.name, compressedFile.type);

      // Step 3: Upload to S3 using PUT
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": compressedFile.type },
        body: compressedFile,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      setMessage("Upload successful!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        className="cursor-pointer border hover:bg-gray-100"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default function Files() {
  return (
    <div>
      <h1>Files</h1>
      <p>Upload an image here:</p>
      <ImageUploader fetchPresignedUrl={generatePresignedUrl} />
    </div>
  );
}
