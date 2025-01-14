import { StatsResponse } from "@/interfaces/stats-response.interface";

export const StatsImagesUseCase = async (startDate: Date, endDate: Date) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/stats?startDate=${
        startDate.toISOString().split("T")[0]
      }&endDate=${endDate.toISOString().split("T")[0]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as StatsResponse;

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
