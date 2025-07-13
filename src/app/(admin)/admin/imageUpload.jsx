// app/(admin)/blog/upload-image.tsx
"use client";
import imageCompression from "browser-image-compression";
import { useState } from "react";

// export default function ImageUploader() {
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       // Compress the image to WebP format
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1200,
//         useWebWorker: true,
//         fileType: "image/webp",
//       });

//       // Prepare form data for upload
//       const formData = new FormData();
//       formData.append("file", compressedFile);

//       // Send to the Next.js Route Handler
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setImageUrl(data.url);
//         alert("Image uploaded successfully!");
//       } else {
//         console.error(data);
//         alert("Upload failed.");
//       }
//     } catch (error) {
//       console.error("Error compressing/uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       {imageUrl && <img src={imageUrl} alt="Uploaded" width={200} />}
//     </div>
//   );
// }

export default function ImageUploader({
  maxWidthOrHeight = 1200,
  maxSizeMB = 0.05,
  imageUrl = "",
  setImageUrl = () => {},
}) {
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Compress the image to WebP format
      const compressedFile = await imageCompression(file, {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker: true,
        fileType: "image/webp",
      });

      // Create a blob URL for download
      const blobUrl = URL.createObjectURL(compressedFile);
      setImageUrl(blobUrl);

      // Automatically download the compressed file
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `compressed-${file.name
        .split(".")
        .slice(0, -1)
        .join(".")}.webp`;
      link.click();
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Compressed Preview" width={200} />}
    </div>
  );
}
