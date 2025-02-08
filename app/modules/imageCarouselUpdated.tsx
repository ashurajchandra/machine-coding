"use client"
import { useState } from "react";


const ImageCarousel = (props) =>{

    const {images} = props;
const [activeIndex, setActiveIndex] = useState(0);
const currImage = images[activeIndex]
console.log("activeIndex",activeIndex)
const handleOnClick = (usecase, currentIndex) =>{
// logic to toggle between images

if(usecase === 'dot'){
    setActiveIndex(currentIndex)
    return
}
// if (usecase === 'prev'){
//     setActiveIndex(currentIndex ===0 ? )
// }
}

return (
    <div className="w-full mx-auto p-4 bg-black flex flex-col items-center justify-center">
        {/* Main container wrapper */}
        <div className="relative h-[400px] rounded-lg ">
            {/* Prev button */}
            <button className="absolute left-4  p-3 top-1/2 transform-translate-y-1/2 z-10 bg-black text-white rounded-full border-0 " onClick={()=>handleOnClick('prev', activeIndex)}>&larr;</button>
            {/* Images */}
            <div className="h-full">
            {
                images.map(({src}, index:number)=>{
                return <img src={src} key={index} className={` w-full h-full object-cover transition-opacity duration-300 ${index===activeIndex? 'opacity-100': 'opacity-0'}`} />
                })
            }
            </div>
            {/* Next button */}
            <button className="absolute p-3 right-4 top-1/2 transform-translate-y-1/2 z-10 bg-black text-white rounded-full border-0 " onClick={()=>handleOnClick('next', activeIndex)}>&rarr;</button>

        </div>
        {/* Dots navigation */}
        <div>
            {
               images.map((src:string,index:number)=>{
               return <button
               key={index}
               onClick={()=>handleOnClick('dot',index)}
               className={`w-3 h-3 rounded-full transition-all duration-300 ${index ===activeIndex ? 'bg-blue-500 w-6': 'bg-gray-300 hover:bg-gray-400'}`}
               >

                </button>
               }) 
            }
        </div>
    </div>
)

}
export default ImageCarousel;