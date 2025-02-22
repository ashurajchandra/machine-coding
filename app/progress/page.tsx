"use client"
import { useState, useRef } from "react";
import ProgressBar from "../modules/progressBar";

const MyProgress = () =>{
    const [values, setValues] = useState<any[]>([])
    const count = useRef(1)
    
    //let count = 1;
    const handleClick = () =>{
        const prevCount = count.current
         setValues([...values, prevCount])
         count.current = count.current+1
    }
    console.log("values", values)
    console.log("count", count)
    return (
        <div className="flex gap-[5px] flex-col">
            <button onClick={handleClick}>Add</button>
        {/* <ProgressBar value={60}/>
        <ProgressBar value={70}/>
        <ProgressBar value={25}/>
        <ProgressBar value={100} />
        <ProgressBar value={0} />
        <ProgressBar value={2} /> */}
        {
            values.map((value)=><ProgressBar key={value} value={0} dynamic  timerValue={20}/>)
        }
        </div>
    )
}

export default MyProgress;