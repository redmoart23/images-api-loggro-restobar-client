"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/gallery/upload-zone";
import { ImageGrid } from "@/components/gallery/image-grid";
import { FilterButton } from "@/components/gallery/filter-button";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadImageUseCase } from "@/use-cases/upload-image.use-case";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableComponent } from "@/components/gallery/table-component";
import { StatsResponse } from "@/interfaces/stats-response.interface";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploaderName, setUploaderName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState<StatsResponse[]>([]);

  const { toast } = useToast();

  const handleUpload = (file: File) => {
    setSelectedFile(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploaderName("");
  };

  const handleSubmit = async () => {
    if (!selectedFile || !uploaderName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor selecciona una imagen y ingresa tu nombre",
      });
      return;
    }

    setIsLoading(true);

    try {
      const imageUrlResponse = await UploadImageUseCase(
        selectedFile,
        uploaderName
      );

      if (!imageUrlResponse) {
        throw new Error("Error al subir la imagen");
      }

      toast({
        title: "¡Éxito!",
        description: "La imagen se ha subido correctamente",
      });

      handleClear();
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al subir la imagen",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                <p className="text-2xl font-bold mb-2 text-gray-600">
                  Estadísticas de imágenes procesadas
                </p>
              </DialogTitle>
            </DialogHeader>
            <TableComponent stats={stats}  /> 
            <Button
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleCloseModal}
            >
              <span className="font-bold tracking-widest">¡Entendido!</span>
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <FilterButton
          setImages={setImages}
          setShowModal={setShowModal}
          setStats={setStats}
        />
      </div>

      <div className="grid gap-6">
        <UploadZone
          onUpload={handleUpload}
          selectedFile={selectedFile}
          onClear={handleClear}
        />

        <div className="flex gap-4">
          <Input
            placeholder="Nombre de quien lo sube..."
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="flex-1"
            required
          />
          <Button
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={handleSubmit}
            disabled={isLoading || !selectedFile || !uploaderName.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Subir"
            )}
          </Button>
        </div>

        {images.length === 0 && (
          <div className="flex items-center justify-center h-full text-4xl font-bold text-gray-400">
            Filtra por fecha para ver las imágenes ↗️
          </div>
        )}
        <ImageGrid images={images} />
      </div>
      <Toaster />
    </div>
  );
}
