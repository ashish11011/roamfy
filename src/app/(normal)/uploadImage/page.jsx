"use client";
import React from "react";

const Page = () => {
  const [file, setFile] = React.useState(null);

  async function handleImageUploadToS3() {
    let imageLinks = [];
    function getImageName(url) {
      // Split the URL by slashes and take the last part
      const parts = url.split("/");
      const lastPart = parts[parts.length - 1];
      // Remove query parameters if they exist
      const imageName = lastPart.split("?")[0];
      return `https://s3.ap-south-1.amazonaws.com/codeframe-ashish-harshit/rishab/v1/roamfy/${imageName}`;
    }

    const response = await fetch("/api/s3/getImageUploadURL", {
      method: "POST",
      body: JSON.stringify({
        count: file?.length || 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      for (let i = 0; i < 1; i++) {
        const responst = await fetch(data[0], {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "image/jpeg",
          },
        });
        const imageS3Link = getImageName(data[i]);
        imageLinks.push(imageS3Link);
      }

      console.log("Image links:", imageLinks);
    } else {
      console.error("Error submitting form:", response.statusText);
    }
    console.log("Image links:", imageLinks);
    // setFormData({ ...formData, images: imageLinks });
    // setImageAdded(true);
  }

  return (
    <div>
      <button onClick={handleImageUploadToS3}>Upload</button>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>
  );
};

export default Page;
