"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className={cn("relative group", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">上一张</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">下一张</span>
      </Button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">跳转到图片 {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
