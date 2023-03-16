import { ColorType,colorTypes } from "./colorTypes";

export const Palette = ({ setcolor}: {setcolor : React.Dispatch<React.SetStateAction<number>>}) => {


    const colors = new Array(Object.keys(ColorType).filter((v) => isNaN(Number(v))).length +1).fill(0).map((_, i) => i);


    return (
      <div className="p-2 bg-white fixed left-0">
        {colors.map((_,index)=>{
            return    <div key={index} className={`w-8 h-8 ${(colorTypes as any)[index].emoji} border border-black justify-center cursor-pointer hover:ring`}
            onClick={(e)=>{e.preventDefault
                setcolor(index)
              }}
            >

            </div>
        })
        }
         
      </div>
    );
  };