"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onUpload: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export function UploadZone({
  onUpload,
  selectedFile,
  onClear,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
    } else {
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/webp")
    ) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/webp")
    ) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleClear = () => {
    setPreview("");
    onClear();
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative",
        isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 w-6 h-6"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="absolute top-full left-1/2 transform -translate-x-1/2 text-sm text-gray-600 truncate">
            {selectedFile?.name.toLocaleLowerCase()}
          </p>
        </div>
      ) : (
        <>
          <Upload className="w-10 h-10 mx-auto mb-4 text-emerald-500 " />
          <p className="text-sm text-gray-600">
            Arrastra tu imagen aquí o da click para seleccionar
          </p>
          <p className="text-xs text-gray-500 mt-1">Formatos jpg o jpeg</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.webp"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
          />
        </>
      )}
    </div>
  );
}
