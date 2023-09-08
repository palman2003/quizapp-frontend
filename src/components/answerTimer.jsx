/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./qtimer.scss"
import { useEffect,useState,useRef } from "react";
function AnswerTimer({duration,onTimeUp}){
    const [counter,setCounter]=useState(0);
    const [progressLoaded,setProgressLoaded]=useState(0);
    const intervalRef=useRef();
    useEffect(()=>{
        intervalRef.current=setInterval(()=>{
            setCounter((cur)=>cur+1);
        },1000);
        return()=>clearInterval(intervalRef.current)
    },[]);

    useEffect(()=>{
        setProgressLoaded(100*(counter/duration));
        if(counter===duration){
                clearInterval(intervalRef.current)
                setTimeout(()=>{
                    onTimeUp();
                })
        }
    },[counter,duration]);
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