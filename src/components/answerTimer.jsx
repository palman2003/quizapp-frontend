/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./qtimer.scss"
import { useEffect,useState,useRef } from "react";
function AnswerTimer({duration,onTimeUp}){
    const [progressLoaded,setProgressLoaded]=useState(0);
    const intervalRef=useRef();
    const counter = useRef(0);


    useEffect(()=>{
        intervalRef.current=setInterval(()=>{
            counter.current += 1;
            setProgressLoaded(100*(counter.current/(duration-1)));
            console.log(counter.current + "sec elapsed")
            if(counter.current===duration){
                clearInterval(intervalRef.current)
                onTimeUp()
        }
        },1000)
        return ()=>clearInterval(intervalRef.current)
    },[])

    return(
       <div className="anwer-timer">
        <div
        style={{
            width:`${progressLoaded}%`,
            backgroundColor: `${
                progressLoaded<40
                ? "#457eba"
                :progressLoaded<85
                ?"orange"
                :"red"
           }`,
        }}
            
        className="progress">

        </div>

       </div> 
    )
}
export default AnswerTimer;