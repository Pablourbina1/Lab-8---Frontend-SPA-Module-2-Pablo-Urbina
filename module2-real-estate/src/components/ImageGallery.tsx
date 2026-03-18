import { useState } from "react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setSelectedIndex(index)
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted flex items-center justify-center rounded-lg">
        <span className="text-muted-foreground">No hay imágenes</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* Imagen principal */}
      <div className="rounded-lg overflow-hidden">
        <img
          src={images[selectedIndex ?? 0]}
          alt={title}
          className="w-full h-[400px] object-cover cursor-pointer"
          onClick={() => handleClick(0)}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title} - ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      )}

      {/* Debug temporal */}
      {selectedIndex !== null && (
        <p className="text-sm text-muted-foreground">
          Imagen seleccionada: {selectedIndex + 1}
        </p>
      )}

    </div>
  )
}