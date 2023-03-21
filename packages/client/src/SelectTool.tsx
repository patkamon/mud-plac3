import { colorTypes } from "./colorTypes";



export const SelectTool = ({pickcolor}: {pickcolor: number}) => {

    console.log("white is", pickcolor)

    return (
<div className={`w-[3vw] h-[3vw] border-4 border-white ${pickcolor == 0 || pickcolor == 16 ? "bg-white" : (colorTypes as any)[pickcolor]?.emoji}`}>
    <div className="flex justify-center text-6xl mt-[2px]">{pickcolor == 16 ? "👆" : ""}</div>
   
</div>
    );
  };