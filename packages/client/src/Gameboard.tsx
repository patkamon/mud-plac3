import { useMapConfig } from "./useMapConfig";
import { ethers } from "ethers";
import  ColorSystem  from "../artifact/ColorSystem.json";
// import { useMUD } from "./MUDContext";
import { toast } from "react-toastify";
import { Inspect, apollo_query } from "./Inspect";
import { useState } from "react";
import { usedchain } from "./mud/config";

export interface InspectData {
  entity: number;
  x: number;
  y: number,
  color?: string 
}
export interface Detail {
  caller: string
  timestamp: Date 
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



    //local
    // const {
    //   components: { PlaceConfig },
    //   systems,
    //   playerEntity,
    // } = useMUD();


    // parse byte
//   console.log(
//     ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256','bytes'], big)
// )

// query to address
// function dec2hex(str : string){ // .toString(16) only works up to 2^53
//   const dec = str.toString().split('');
//   const sum = []
//   const hex = []
//   let i
//   let s
//   while(dec.length){
//       s = 1 * (dec.shift() as any)
//       for(i = 0; s || i < sum.length; i++){
//           s += (sum[i] || 0) * 10
//           sum[i] = s % 16
//           s = (s - sum[i]) / 16
//       }
//   }
//   while(sum.length){
//       hex.push(sum.pop()?.toString(16))
//   }
//   return hex.join('')
// }

//   console.log(
//     dec2hex("1373933471351055460412464408200194390431149143120")
//   )

  //address to int to query
  // const addr = "0xf0a94ec0f27203c399e17d5533a77e00f9813450"

  // console.log(ethers.BigNumber.from(addr))
  // console.log(BigInt(ethers.BigNumber.from(addr)._hex).toString())

    const [isInspect, setIsInspect] = useState<InspectData | null>(null);
    const [detail, setDetail] = useState<Detail | null>(null);






    async function requestAccount() {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    }

    async function delegate(event: any,entity: number, x: number, y: number, c: string){
      onClickProduct(event, entity, x, y, c)
    }

    async function onClickProduct(event: any,entity: number, x: number, y: number, c: string){
      event.preventDefault();
      if (pickcolor != 16){
        const toastId = toast.loading("Coloring…");
        if (typeof (window as any).ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const ownerSigner = provider.getSigner();
   
            const contract = new ethers.Contract(
              usedchain.colorSystemAddress,
              ColorSystem.abi,
              ownerSigner
            );
            try{
              await contract.executeTyped(entity,{ x:x, y:y, color:pickcolor})
              toast.update(toastId, {
                isLoading: false,
                type: "success",
                render: `Done!`,
                autoClose: 2500,
                closeButton: true,
            })
            }catch (err){
              const isCooldown = String(err).includes("You still have a cooldown!")
              if (isCooldown  === true) {
                toast.update(toastId, {
                  isLoading: false,
                  type: "error",
                  render: `Oh no, you still have cooldown!`,
                  autoClose: 2000,
                  closeButton: true,
                });}else{
                  toast.update(toastId, {
                    isLoading: false,
                    type: "error",
                    render: `Something wrong!`,
                    autoClose: 2000,
                    closeButton: true,
                  })
                }
            }
    }}else{
      console.log("spectator mode")
      // setDetail()
      apollo_query({ 'entity':entity,'x': x,'y': y,"color":c})
      .then((data) => {
        const d = new Date(0)
        console.log('Subgraph data: ', data.data.colorings[0])
        d.setUTCSeconds(data.data.colorings[0].blockTimestamp)
        const caller = data.data.colorings[0].caller.toString()
        setDetail({"caller": caller, 'timestamp':d})
      })
      .catch((err) => {
        console.log('Error fetching data: ', err)
        const d = new Date(0)
        setDetail({"caller": "0x00", 'timestamp':d})
      })
      setIsInspect({ 'entity':entity,'x': x,'y': y,"color":c})
    }
  }

    // async function onClickLocal(event: any,entity: number, x: number, y: number, c: string){
    //   event.preventDefault();
    //   if (pickcolor != 16){
    //     const toastId = toast.loading("Coloring…");
    //     try {
    //               await systems["system.Move"].executeTyped(entity, { x:x, y:y, color:pickcolor});
    //               toast.update(toastId, {
    //                   isLoading: false,
    //                   type: "success",
    //                   render: `Done!`,
    //                   autoClose: 2500,
    //                   closeButton: true,
    //               })
    //     } catch (err){
    //               const isCooldown = String(err).includes("You still have a cooldown!")
    //               if (isCooldown  === true) {
    //                 toast.update(toastId, {
    //                   isLoading: false,
    //                   type: "error",
    //                   render: `Oh no, you still have cooldown!`,
    //                   autoClose: 2000,
    //                   closeButton: true,
    //                 });
    //               }
    //             }
    //   }else{
    //     console.log("spectator mode")
    //     setIsInspect({ 'entity':entity,'x': x,'y': y,"color":c})
    //   }
    //   }
    

  
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

            onClick={(e)=> delegate(e,0,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,1,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,2,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,3,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,4,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,5,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,6,x,y,terrain?.emoji as string)}
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
              onClick={(e)=> delegate(e,7,x,y,terrain?.emoji as string)}
            >
             
            </div>
          )})
        )}

            {isInspect ?  (<Inspect inspect={isInspect} detail={detail}></Inspect>) : <></>}

      </div>
    );
  };
