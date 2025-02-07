import {useState} from 'react';

const ImageCarousel = (props:any) =>{
const {images, activeImage} = props;

const [carouselImages, setCarouselImages] = useState(images)
const [currentImage, setCurrentImage] = useState(activeImage?activeImage:images[0].url)

const handleClick = (usecase, currentId) =>{
    if(usecase === 'dot'){
        const filterClickedImg = carouselImages.filter(({id})=> id===currentId)
        setCurrentImage(filterClickedImg)
        return
    }
    const findImgIndex = carouselImages.findIndex((id)=> id===currentId)
    console.log("findImgIndex",findImgIndex)
    if( findImgIndex !== -1 && usecase ==='prev'){
        const prevIndex = Number(findImgIndex) - 1
        setCurrentImage(carouselImages[prevIndex])
        return
    }

    if( findImgIndex !== -1 && usecase ==='next'){
        const prevIndex = Number(findImgIndex) + 1
        setCurrentImage(carouselImages[prevIndex])
        return
    }
}
console.log("currentImage",currentImage)

    return(
        <>
        <div>
            <div>
                <div>
                    <button onClick={()=>handleClick('prev', currentImage.id)}>&larr;</button>
                {
                    carouselImages.map(({url,id},index)=>{
                        <img src={url} alt={id} />
                    })
                }
                <button onClick={()=>handleClick('next', currentImage.id)}>&rarr;</button>
                </div>
            
            {
            carouselImages.map(({url,id})=>{
                return <div className={id===currentImage.id ? 'active': 'inactive'} onClick={()=>{handleClick('dot',id)}}></div>
            })
            }

            </div>
        </div>
        </>
    )
}
export default ImageCarousel