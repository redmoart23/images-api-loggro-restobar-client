import { UploadedImageResponse } from "@/interfaces/uploaded-image-response.interface";

export const UploadImageUseCase = async (imageFile: File, uploadedBy?: string) => {

  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    if (uploadedBy) {
      formData.append("uploadedBy", uploadedBy);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json() as UploadedImageResponse;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
