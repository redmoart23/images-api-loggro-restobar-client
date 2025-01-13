'use client'

import { useState } from "react"

import { FilterButton } from "@/components/gallery/filter-button"
import { ImageGrid } from "@/components/gallery/image-grid"
import { UploadZone } from "@/components/gallery/upload-zone"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>(Array(9).fill("/placeholder.svg"))
  const [uploaderName, setUploaderName] = useState("")

  const handleUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setImages(prev => [imageUrl, ...prev])
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Galleria de Imagenes</h1>
        <FilterButton />
      </div>
      
      <div className="grid gap-6">
        <UploadZone onUpload={handleUpload} />
        
        <div className="flex gap-4">
          <Input
            placeholder="Nombre de quien lo sube..."
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Subir
          </Button>
        </div>

        <ImageGrid images={images} />
      </div>
    </div>
  )
}

