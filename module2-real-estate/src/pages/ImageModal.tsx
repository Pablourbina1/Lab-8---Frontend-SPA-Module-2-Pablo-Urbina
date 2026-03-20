import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
}

export function ImageModal({ images, currentIndex, onClose }: ImageModalProps) {
    const [index, setIndex] = useState(currentIndex)

    const prevImage = () => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >

        <img
          src={images[index]}
          className="w-full max-h-[80vh] object-contain rounded"
        />

        <button
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <X size={28} />
        </button>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
          onClick={prevImage}
        >
          <ChevronLeft size={40} />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          onClick={nextImage}
        >
          <ChevronRight size={40} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
          {index + 1} de {images.length}
        </div>

      </div>
    </div>
  )
}
