"use server";

import cloudinary from "@/lib/cloudinary";

const cloudinaryUpload = async (
  base64File: string,
  fileId: string,
  userId: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload(
      base64File,
      {
        resource_type: "auto",
        folder: `user_${userId}`,
        public_id: fileId,
        use_filename: false,
        overwrite: false,
      },
      async (error: any, result: any) => {
        if (error) {
          return reject("Error while uploading file to Cloudinary");
        }

        resolve(result.secure_url);
      }
    );
  });
};

export default cloudinaryUpload;
