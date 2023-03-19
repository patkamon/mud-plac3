import { ColorType,colorTypes } from "./colorTypes";

export const SelectTool = ({pickcolor}: {pickcolor: number}) => {


    return (
    //   <div className="p-2 bg-white fixed left-0 top-40 flex flex-col ">
    //     {colors.map((_,index)=>{
    //         return    <div key={index} className={`w-[2vw] h-[2vw] ${(colorTypes as any)[index]?.emoji} border  justify-center cursor-pointer hover:ring ${pickcolor == index? "ring-8 ring-yellow-500" : "border-black"}`}
    //         onClick={(e)=>{e.preventDefault
    //             setcolor(index)
    //           }}
    //         >
    //             <div className="flex justify-center text-3xl mt-[2px]">{index == 16 ? "👆" : ""}</div>
    //         </div>
    //     })
    //     }
         
    //   </div>
<div className={`w-[3vw] h-[3vw] border border-4 border-white ${pickcolor == 16 ? "bg-white" : (colorTypes as any)[pickcolor]?.emoji}`}>
    <div className="flex justify-center text-6xl mt-[2px]">{pickcolor == 16 ? "👆" : ""}</div>
</div>
    );
  };