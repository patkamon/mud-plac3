import { SelectTool } from "./SelectTool";
import { ColorType,colorTypes } from "./colorTypes";




export const Palette = ({pickcolor, setcolor}: {pickcolor: number, setcolor : React.Dispatch<React.SetStateAction<number>>}) => {


    const colors = new Array(Object.keys(ColorType).filter((v) => isNaN(Number(v))).length +2).fill(0).map((_, i) => i);




    return (
      <div className="flex flex-col fixed top-1/2 left-0 z-10 transform  -translate-y-1/2 ">
        <SelectTool pickcolor={pickcolor}/>
        <div className="p-2 bg-white">
        {colors.map((_,index)=>{
            return    <div key={index} className={`w-[2vw] h-[2vw] ${(colorTypes as any)[index] ? (colorTypes as any)[index].emoji : 'bg-white' } border  justify-center cursor-pointer hover:ring border-black`}
            onClick={(e)=>{e.preventDefault
                setcolor(index)
              }}
            >


                <div className="flex justify-center">{index == 16 ? <img className="min-w-[2px] p-1" src="./search.png" /> : ""}</div>
            </div>
        })
        }
        </div>
         
      </div>
    );
  };