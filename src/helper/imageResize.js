"use client";
import imageCompression from "browser-image-compression";

export default async function imageCompressor({
  maxWidthOrHeight = 1200,
  maxSizeMB = 0.05,
  file = "",
}) {
  if (!file) return;

  try {
    const compressedBlob = await imageCompression(file, {
      maxSizeMB: maxSizeMB,
      maxWidthOrHeight: maxWidthOrHeight,
      useWebWorker: true,
      fileType: "image/webp", // this controls the output format
    });

    // Get original name without extension
    const originalName =
      file.name?.split(".").slice(0, -1).join(".") || "compressed";

    // Convert blob to File and set name with .webp
    const webpFile = new File([compressedBlob], `${originalName}.webp`, {
      type: "image/webp",
    });

    return webpFile;
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}
