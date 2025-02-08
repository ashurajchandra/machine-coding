"use client";

import { useState, useCallback, useEffect } from 'react';

interface CarouselImage {
  src: string;
  id: string | number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  activeImage?: CarouselImage;
  autoPlay: boolean;
  autoPlayDelay: number;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { images, autoPlay=true, autoPlayDelay=300 } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false)
  const handleClick = useCallback ((usecase: 'dot' | 'prev' | 'next', index?:number)=>{
    const lastIndex = images.length-1 ;

    setActiveIndex((prevIndex:number)=>{
      if(usecase === 'dot' && index!= undefined) return  index;
      if(usecase === 'prev') return prevIndex === 0 ? lastIndex: prevIndex-1;
      if(usecase === 'next') return prevIndex ===lastIndex? 0 : prevIndex +1;
      return prevIndex
    })

},[images.length])

useEffect(()=>{
  if(!autoPlay || isPaused) return;

  const intervalId = setInterval(()=>{
   handleClick('next')
  },autoPlayDelay)

  return ()=>clearInterval(intervalId)

},[isPaused, autoPlay, autoPlayDelay, handleClick])


  return (
    <div 
    className="w-full max-w-3xl mx-auto p-4"
    onMouseEnter={() => setIsPaused(true)} 
    onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        {/* Main Image Container */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {/* Navigation Buttons */}
          <NavButton direction='prev' onClick={()=>handleClick('prev')} />
          
          {/* Images */}
          <div className="h-full">
            {images.map(({ src, id },index:number) => (
              <img
                key={id}
                src={src}
                alt={`slide-${id}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <NavButton direction='next' onClick={()=>handleClick('next')} />
        </div>

        {/* Dots Navigation */}
       <DotNavigation images={images} activeIndex={activeIndex} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ImageCarousel;

const DotNavigation = ({images, activeIndex,onClick}:{images:CarouselImage[], activeIndex:number , onClick:(usecase:'dot', index:number)=>void})=>{

 return (
  <div className="flex justify-center gap-2 mt-4">
  {images.map(({ id },index:number) => (
    <button
      key={id}
      onClick={() => onClick('dot', index)}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        index === activeIndex
          ? 'bg-blue-500 w-6'
          : 'bg-gray-300 hover:bg-gray-400'
      }`}
      aria-label={`Go to slide ${index}`}
    />
  ))}
</div>
 )
}
const NavButton = ({direction, onClick}:{direction: "prev"| "next", onClick:()=>void})=>{
  return(
    <button 
    id={direction}
    onClick={onClick}
    className={`absolute ${direction ==='prev'?'left-4':'right-4'} top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg`}
  >
    {direction ==='prev'? <>&larr;</> : <>&rarr;</>}
    </button>
  )

}