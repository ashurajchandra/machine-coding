
"use client"
import {useState, useEffect} from 'react';

interface Star{
    id:number;
    url:string;
    active:boolean;
}
interface Props{
    stars: number;
    activeStars: number
}
const empty_star = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg';
const filled_star = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png';

const StarRating = (props:Props) =>{
    const {stars, activeStars} = props;
    const [currentActiveStars, setCurrentActiveStars] = useState<Star[]>([]);
    const [prevStateData, setPrevStateData] = useState<Star[]>([]);
    const [isClicked, setIsClicked] = useState(false)

    useEffect(()=>{
    const modifiedStars=  Array.from({length:stars}).map((_,index)=>({id:index, url:empty_star,active:false}));

    Array.from({length:activeStars}).forEach((_,index)=>{
        modifiedStars[index].url = filled_star;
        modifiedStars[index].active = true  
    })
    setCurrentActiveStars(modifiedStars)
    setPrevStateData(modifiedStars)
    },[])

    console.log("currentActiveStars",currentActiveStars)

    

    const updateStars = (id:number, isFinal:boolean) =>{
        const localStars = currentActiveStars.map((star,index)=>(
            {
                ...star,
                url: index<=id? filled_star: empty_star,
                active: index<=id
            }
        ))
        setCurrentActiveStars(localStars)

        if(isFinal){
            setIsClicked(true)
            setPrevStateData(localStars)
        }
    }

    return (
        <div className='flex gap-[3px]'
        >
            {
             currentActiveStars.length>0 && currentActiveStars.map(({id,url,active},index)=>(
                  <img 
                  src={url} 
                  onClick={()=>updateStars(id, true)} 
                  className="w-[30px] h-[30px]" key={id} 
                  onMouseEnter={()=>updateStars(id, false)}
                  onMouseLeave = {()=> !isClicked && setCurrentActiveStars(prevStateData)}
                  />
             )) 
            }
        </div>
    )
}

export default StarRating;