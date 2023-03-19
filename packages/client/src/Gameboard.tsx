import { useMapConfig } from "./useMapConfig";
import { ethers } from "ethers";
import  ColorSystem  from "../artifact/ColorSystem.json";
import { useMUD } from "./MUDContext";
import { toast } from "react-toastify";
import { Inspect } from "./Inspect";
import { useState } from "react";

export interface InspectData {
  entity: number;
  x: number;
  y: number,
  color?: string 
}

export const GameBoard = ({pickcolor}: {pickcolor: number}) => {
    const { width, height, colorValues } = useMapConfig("0x00");
    const Map = useMapConfig("0x01");
    const Map2 = useMapConfig("0x02");
    const Map3 = useMapConfig("0x03");
    const Map4 = useMapConfig("0x04");
    const Map5 = useMapConfig("0x05");
    const Map6 = useMapConfig("0x06");
    const Map7 = useMapConfig("0x07");
    // const Map8 = useMapConfig("0x08");
    // const Map9 = useMapConfig("0x09");
    // const Map10 = useMapConfig("0x10");
    // const Map11 = useMapConfig("0x11");
    const rows = new Array(height).fill(0).map((_, i) => i);
    const columns = new Array(width).fill(0).map((_, i) => i);
    const rows2 = new Array(Map.height).fill(0).map((_, i) => i);
    const columns2 = new Array(Map.width).fill(0).map((_, i) => i);
    const rows3 = new Array(Map2.height).fill(0).map((_, i) => i);
    const columns3 = new Array(Map2.width).fill(0).map((_, i) => i);
    const rows4 = new Array(Map3.height).fill(0).map((_, i) => i);
    const columns4 = new Array(Map3.width).fill(0).map((_, i) => i);
    const rows5 = new Array(Map4.height).fill(0).map((_, i) => i);
    const columns5 = new Array(Map4.width).fill(0).map((_, i) => i);
    const rows6 = new Array(Map5.height).fill(0).map((_, i) => i);
    const columns6 = new Array(Map5.width).fill(0).map((_, i) => i);
    const rows7 = new Array(Map6.height).fill(0).map((_, i) => i);
    const columns7 = new Array(Map6.width).fill(0).map((_, i) => i);
    const rows8 = new Array(Map7.height).fill(0).map((_, i) => i);
    const columns8 = new Array(Map7.width).fill(0).map((_, i) => i);
    // const rows9 = new Array(Map.height).fill(0).map((_, i) => i);
    // const columns9 = new Array(Map.width).fill(0).map((_, i) => i);
    // const rows10 = new Array(Map.height).fill(0).map((_, i) => i);
    // const columns10 = new Array(Map.width).fill(0).map((_, i) => i);
    // const rows11 = new Array(Map.height).fill(0).map((_, i) => i);
    // const columns11 = new Array(Map.width).fill(0).map((_, i) => i);
    // const rows12 = new Array(Map.height).fill(0).map((_, i) => i);
    // const columns12 = new Array(Map.width).fill(0).map((_, i) => i);


    //local
    const {
      components: { PlaceConfig },
      systems,
      playerEntity,
    } = useMUD();

  

    const [isInspect, setIsInspect] = useState<InspectData | null>(null);






    async function requestAccount() {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    }
              // deploy
            //         onClick={async (event) => {
            //   event.preventDefault();
            //   if (typeof (window as any).ethereum !== "undefined") {
            //     await requestAccount();
            //   const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            //   const ownerSigner = provider.getSigner();
            //   const contract = new ethers.Contract(
            //     "0xC5ee9B6f55bE96AAba03538b7b36f1dd5c8e3810",
            //     ColorSystem.abi,
            //     ownerSigner
            // );
            // try{
            //   const tx = await contract.executeTyped({ x:x, y:y, color:pickcolor})
            //   console.log(tx)
            // }catch (err){
            //   console.log(err)
            // }
    async function onClickLocal(event: any,entity: number, x: number, y: number, c: string){
      event.preventDefault();
      if (pickcolor != 16){
        console.log(pickcolor)
        const toastId = toast.loading("Coloring…");
        try {
                  await systems["system.Move"].executeTyped(entity, { x:x, y:y, color:pickcolor});
                  toast.update(toastId, {
                      isLoading: false,
                      type: "success",
                      render: `Done!`,
                      autoClose: 2500,
                      closeButton: true,
                  })
        } catch (err){
                  const isCooldown = String(err).includes("You still have a cooldown!")
                  if (isCooldown  === true) {
                    toast.update(toastId, {
                      isLoading: false,
                      type: "error",
                      render: `Oh no, you still have cooldown!`,
                      autoClose: 2000,
                      closeButton: true,
                    });
                  }
                }
      }else{
        console.log("spectator mode")
        setIsInspect({ 'entity':entity,'x': x,'y': y,"color":c})
      }
      }
    

  
    return (
      <div className="inline-grid p-2 bg-white">
        {rows.map((y) =>
          columns.map((x) => {
            const terrain = colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}

            onClick={(e)=> onClickLocal(e,0,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}
{rows2.map((y) =>
          columns2.map((x) => {
            const terrain = Map.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width,
                gridRow: y + 1,
              }}
              onClick={(e)=> onClickLocal(e,1,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}
        
{rows3.map((y) =>
          columns3.map((x) => {
            const terrain = Map2.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width + width,
                gridRow: y + 1,
              }}
              onClick={(e)=> onClickLocal(e,2,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}


{rows4.map((y) =>
          columns4.map((x) => {
            const terrain = Map3.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width + width +width ,
                gridRow: y + 1,
              }}
              onClick={(e)=> onClickLocal(e,3,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}

{rows5.map((y) =>
          columns5.map((x) => {
            const terrain = Map4.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x +1,
                gridRow: y + height,
              }}
              onClick={(e)=> onClickLocal(e,4,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}

{rows6.map((y) =>
          columns6.map((x) => {
            const terrain = Map5.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width,
                gridRow: y + height,
              }}
              onClick={(e)=> onClickLocal(e,5,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}


{rows7.map((y) =>
          columns7.map((x) => {
            const terrain = Map6.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width + width,
                gridRow: y + height,
              }}
              onClick={(e)=> onClickLocal(e,6,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}

{rows8.map((y) =>
          columns8.map((x) => {
            const terrain = Map7.colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

            return (
            <div
              key={`${x},${y}`}
              className={`w-2 h-2 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
                pickcolor ==0 ?  "hover:bg-white" :
                pickcolor ==1 ?  "hover:bg-[#000000]" :
                pickcolor ==2 ?  "hover:bg-[#1D2B53]"  :
                pickcolor ==3 ?  "hover:bg-[#7E2553]" :
                pickcolor ==4 ?  "hover:bg-[#008751]" :
                pickcolor ==5 ?  "hover:bg-[#AB5236]" :
                pickcolor ==6 ?  "hover:bg-[#5F574F]" :
                pickcolor ==7 ?  "hover:bg-[#C2C3C7]" :
                pickcolor ==8 ?  "hover:bg-[#FF004D]" :
                pickcolor ==9 ?  "hover:bg-[#FFA300]" :
                pickcolor ==10 ?  "hover:bg-[#FFEC27]" :
                pickcolor ==11 ?  "hover:bg-[#00E436]" :
                pickcolor ==12 ?  "hover:bg-[#29ADFF]" :
                pickcolor ==13 ?  "hover:bg-[#83769C]" :
                pickcolor ==14 ?  "hover:bg-[#FF77A8]" :
                pickcolor ==15 ?  "hover:bg-[#FFCCAA]":
                ""
                
              }
              
              `}
              style={{
                gridColumn: x + width + width + width,
                gridRow: y + height,
              }}
              onClick={(e)=> onClickLocal(e,7,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}

            {isInspect ?  (<Inspect inspect={isInspect}></Inspect>) : <></>}

      </div>
    );
  };
