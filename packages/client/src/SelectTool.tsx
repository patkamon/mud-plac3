import { colorTypes } from "./colorTypes";



export const SelectTool = ({pickcolor}: {pickcolor: number}) => {

    console.log("white is", pickcolor)

    return (
<div className={`w-[4vw] h-[4vw] border-4 border-white ${pickcolor == 0 || pickcolor == 16 ? "bg-white" : (colorTypes as any)[pickcolor]?.emoji}`}>
    <div className="flex justify-center mt-[2px]">{pickcolor == 16 ? <img className="min-w-[2px] p-1" src="./search.png" /> : ""}</div>
   
</div>
    );
  };