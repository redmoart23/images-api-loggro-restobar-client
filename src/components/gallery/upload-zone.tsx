'use client'

import { useState } from "react"
import { Upload } from 'lucide-react'
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onUpload: (file: File) => void
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files[0]) {
      onUpload(files[0])
    }
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
        isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
      <p className="text-sm text-gray-600">
        Arrastra tu imagen aquí o da click para seleccionar
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Formatos jpg o jpeg
      </p>
    </div>
  )
}

