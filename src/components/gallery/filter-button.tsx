"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { SearchImagesUseCase } from "@/use-cases/search-images.use-case";
import { StatsImagesUseCase } from "@/use-cases/stats-data-processed.use-case";
import { StatsResponse } from "@/interfaces/stats-response.interface";

export function FilterButton({
  setImages,
  setShowModal,
  setStats,
}: {
  setImages: (images: string[]) => void;
  setShowModal: (showModal: boolean) => void;
  setStats: (stats: StatsResponse[]) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSearch = async () => {
    const responseSearch = await SearchImagesUseCase(
      date?.from ?? new Date(),
      date?.to ?? new Date()
    );
    const imageUrls = Array.isArray(responseSearch)
      ? responseSearch.map((item: { imageUrl: string }) => item.imageUrl)
      : [responseSearch.imageUrl];

    if (responseSearch) {
      setImages(imageUrls.reverse());
    }

    handleShowStats();
  };

  const handleShowStats = async () => {
    // stats part
    const responseStats = (await StatsImagesUseCase(
      date?.from ?? new Date(),
      date?.to ?? new Date()
    )) as StatsResponse;

    const stats = Array.isArray(responseStats)
      ? responseStats
      : [responseStats];

    setStats(stats);

    setShowModal(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 relative flex flex-col translate-x-[-18%] left-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
          classNames={{
            day_selected: "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white",
          }}
        />
        <Button onClick={handleSearch} className="self-end mt-4 mr-4 bg-emerald-500 hover:bg-emerald-600">
          Buscar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
