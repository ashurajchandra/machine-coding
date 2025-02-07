"use client";

import { useState } from 'react';

interface CarouselImage {
  src: string;
  id: string | number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  activeImage?: CarouselImage;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { images, activeImage } = props;

  const [carouselImages] = useState(images);
  const [currentImage, setCurrentImage] = useState(activeImage || images[0]);

  const handleClick = (usecase: 'dot' | 'prev' | 'next', currentId: string | number) => {
    if (usecase === 'dot') {
      const filteredImage = carouselImages.find(({ id }) => id === currentId);
      if (filteredImage) setCurrentImage(filteredImage);
      return;
    }

    const currentIndex = carouselImages.findIndex(({ id }) => id === currentId);
    
    if (currentIndex !== -1) {
      if (usecase === 'prev' && currentIndex > 0) {
        setCurrentImage(carouselImages[currentIndex - 1]);
      }
      if (usecase === 'next' && currentIndex < carouselImages.length - 1) {
        setCurrentImage(carouselImages[currentIndex + 1]);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative">
        {/* Main Image Container */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {/* Navigation Buttons */}
          <button 
            onClick={() => handleClick('prev', currentImage.id)}
            disabled={carouselImages.indexOf(currentImage) === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &larr;
          </button>
          
          {/* Images */}
          <div className="h-full">
            {carouselImages.map(({ src, id }) => (
              <img
                key={id}
                src={src}
                alt={`slide-${id}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  id === currentImage.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={() => handleClick('next', currentImage.id)}
            disabled={carouselImages.indexOf(currentImage) === carouselImages.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &rarr;
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {carouselImages.map(({ id }) => (
            <button
              key={id}
              onClick={() => handleClick('dot', id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                id === currentImage.id
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;