"use client"
import {useEffect, useState} from 'react';
interface Props{
    value: number;
    dynamic?:boolean;
    timerValue?: number;
}

const  ProgressBar=(props:Props)=> {
    const { value=0, dynamic=false, timerValue=100 } = props;
    const [currentValue, setCurrentValue] = useState(value)
    const normalizedValue = Math.max(0, Math.min(100, currentValue));

    useEffect(()=>{
      if(!dynamic){
        setCurrentValue(value)
      }
    },[dynamic,value])

    useEffect(()=>{
        if(!dynamic) return;
     const timerId = setInterval(()=>{
       setCurrentValue((prevValue:number)=>{
        if(prevValue>=100){
            clearInterval(timerId)
            return 100
        }
        return Math.round((prevValue+0.1)*10)/10
       })
     },timerValue)

     return ()=>{
        clearInterval(timerId)
     }
    },[timerValue, dynamic, currentValue])

    console.log("currentValue",currentValue)
    const displayValue = Math.round(normalizedValue * 10) / 10;


    return (
    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden ">
     <div className="bg-blue-500 h-8 font-semibold text-white text-sm  flex items-center justify-center text-center"
      style={{ width: `${displayValue}%` }}

     >
      {`${displayValue} %`}
     </div>
    </div>
    )
  }
  export default ProgressBar;
  