import { StatsResponse } from "@/interfaces/stats-response.interface";

export function TableComponent({ stats }: { stats: StatsResponse[] }) {
  return (
    <>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        {Array.isArray(stats) &&
          stats.map((stat, index) => (
            <div key={index} className="mb-4">
              <span className="text-lg font-semibold text-gray-500">
                {stat.date}
              </span>
              <hr className="my-2 border-t border-gray-300" />
              <div className="text-gray-700">
                <p>
                  Total de imágenes procesadas:{" "}
                  <span className="font-medium">
                    {stat.totalImagesUploaded}
                  </span>
                </p>
                <p>
                  Imágenes procesadas por hora:{" "}
                  <span className="font-medium">{stat.imagesPerHour}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
