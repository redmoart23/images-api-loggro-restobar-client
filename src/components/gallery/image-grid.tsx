'use client'

import Image from "next/image"

interface ImageGridProps {
  images: string[]
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-square relative rounded-lg border-2 border-emerald-500 overflow-hidden"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

