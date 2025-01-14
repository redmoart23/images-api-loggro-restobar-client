import { ImageResponse } from "@/interfaces/image-api-response.interface";

export const GetImagesUseCase = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json() as ImageResponse[];

    return data;
  } catch (error) {
    console.log(error);
    return {
      id: "",
      imageUrl: "",
      uploadedBy: "",
      createdAt: new Date(),
    };
  }
};
