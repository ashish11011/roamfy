import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const body = await request.json();

  let URLs = [];

  const URL_EXPIRATION_SECONDS = 30000;

  AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: "ap-south-1",
  });

  const s3 = new AWS.S3();

  const getUploadURL = async () => {
    try {
      const uuid = uuidv4();
      const Key = `${uuid}.jpg`;

      const s3Params = {
        Bucket: "codeframe-ashish-harshit",
        Key: `rishab/v1/roamfy/${Key}`,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: "image/jpeg",
      };

      const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);
      URLs.push(uploadURL);
    } catch (error) {
      console.error("Error generating upload URL:", error);
      throw error;
    }
  };

  try {
    for (let i = 0; i < body.count; i++) {
      await getUploadURL();
    }
  } catch (error) {
    console.error("Error uploading files:", error);
  }

  return new Response(JSON.stringify(URLs), {
    status: 200,
  });
}
