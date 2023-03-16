import { useMapConfig } from "./useMapConfig";
import { ethers } from "ethers";
import  ColorSystem  from "../../contracts/out/ColorSystem.sol/ColorSystem.json";


export const GameBoard = ({pickcolor}: {pickcolor: number}) => {
    const { width, height, colorValues } = useMapConfig();
    const rows = new Array(height).fill(0).map((_, i) => i);
    const columns = new Array(width).fill(0).map((_, i) => i);


    async function requestAccount() {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    }

    
  
    return (
      <div className="inline-grid p-2 bg-white">
        {rows.map((y) =>
          columns.map((x) => {
            const terrain = colorValues.find(
              (t) => t.x === x && t.y === y
            )?.type;

          //   [ColorType.Darkpurple]: {
          //     emoji: "bg-[#7E2553]",

            return (
            <div
              key={`${x},${y}`}
              className={`w-8 h-8 flex items-center justify-center cursor-pointer  hover:ring ${terrain?.emoji}
              ${
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
                "hover:bg-white"
                
              }
              
              `}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
                    onClick={async (event) => {
              event.preventDefault();
              if (typeof (window as any).ethereum !== "undefined") {
                await requestAccount();
              const provider = new ethers.providers.Web3Provider((window as any).ethereum);
              const ownerSigner = provider.getSigner();
              const contract = new ethers.Contract(
                "0xC5ee9B6f55bE96AAba03538b7b36f1dd5c8e3810",
                ColorSystem.abi,
                ownerSigner
            );
            try{
              const tx = await contract.executeTyped({ x:x, y:y, color:pickcolor})
              console.log(tx)
            }catch (err){
              console.log(err)
            }

              }
              // const system = await systems["system.Move"].connect(ownerSigner)
              //  await system.executeTyped({ x:x, y:y, color:pickcolor});
              // systems["system.Move"].executeTyped({ x:x, y:y, color:pickcolor});
              
            }}
            >
             
            </div>
          )})
        )}

        
      </div>
    );
  };
