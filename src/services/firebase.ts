import * as admin from "firebase-admin";
import { Readable } from "stream";

const serviceAccount = require("../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET,
});

const bucket = admin.storage().bucket();

export const uploadImageToFirebase = async (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  const file = bucket.file(filename);

  return new Promise((resolve, reject) => {
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const uploadStream = file.createWriteStream({
      metadata: {
        contentType: "image/jpeg",
      },
    });

    uploadStream.on("finish", async () => {
      try {
        const signedUrls = await file.getSignedUrl({
          action: "read",
          expires: "01-01-2100",
        });

        const downloadUrl = signedUrls[0];
        resolve(downloadUrl);
      } catch (error) {
        reject(error);
      }
    });

    uploadStream.on("error", (error) => {
      reject(error);
    });

    bufferStream.pipe(uploadStream);
  });
};
