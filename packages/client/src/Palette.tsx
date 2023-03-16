import { useState } from "react";
import { ColorType,colorTypes } from "./colorTypes";

export const Palette = ({ setcolor }) => {

    let [pick, setPick]  = useState()

    const colors = new Array(Object.keys(ColorType).filter((v) => isNaN(Number(v))).length +1).fill(0).map((_, i) => i);


    return (
      <div className="p-2 bg-white fixed left-0">
        {colors.map((_,index)=>{
            // console.log(colorTypes[index])
            return    <div className={`w-8 h-8 ${colorTypes[index]?.emoji} border border-black justify-center cursor-pointer hover:ring`}
            onClick={(e)=>{e.preventDefault
                setcolor(index)}}
            >

            </div>
        })
        }
         
      </div>
    );
  };