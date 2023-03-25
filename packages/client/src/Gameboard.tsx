import { useMapConfig } from "./useMapConfig";
import { ethers } from "ethers";
import  ColorSystem  from "../artifact/ColorSystem.json";
// import { useMUD } from "./MUDContext";
import { toast } from "react-toastify";
import { Inspect, apollo_query, apollo_query_time } from "./Inspect";
import { useEffect, useState } from "react";
import { usedchain } from "./mud/config";

export interface InspectData {
  entity: number;
  x: number;
  y: number,
  color?: string 
}
export interface Detail {
  caller: string
  timestamp: string
}

export const GameBoard = ({pickcolor}: {pickcolor: number}) => {
    const Map0 = useMapConfig("0x00");
    const Map1 = useMapConfig("0x01");
    const Map2 = useMapConfig("0x02");
    const Map3 = useMapConfig("0x03");
    const Map4 = useMapConfig("0x04");
    const Map5 = useMapConfig("0x05");
    const Map6 = useMapConfig("0x06");
    const Map7 = useMapConfig("0x07");


    //local
    // const {
    //   components: { PlaceConfig },
    //   systems,
    //   playerEntity,
    // } = useMUD();




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



    const [isInspect, setIsInspect] = useState<InspectData | null>(null);
    const [detail, setDetail] = useState<Detail | null>(null);
    const [zoom, setZoom] = useState(5);

    function componentToHex(c:number) {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r:number, g:number, b:number) {
      return "#"+componentToHex(r) + componentToHex(g) + componentToHex(b) ;
    }


    async function requestAccount() {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    }

    (window as any).ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    async function delegate(event: any){
      onClickProduct(event)
    }





    async function onClickProduct(event: any){
      event.preventDefault();
      const canvas = document.querySelector('canvas')
      const rect = canvas!.getBoundingClientRect()
      const fullX = Math.floor((event.clientX - rect.left)/zoom)
      const fullY = Math.floor((event.clientY - rect.top)/zoom)
      const x = fullX%80
      const y = fullY%80
      const entity = Math.floor(fullX/80) + (Math.floor(fullY/80)*4)
      if (pickcolor != 16){
        const toastId = toast.loading("Coloring…");
        if (typeof (window as any).ethereum !== "undefined") {
            if ((window as any).ethereum.networkVersion !== usedchain.chainId.toString()){
              toast.update(toastId, {
                isLoading: false,
                type: "error",
                render: `This is not correct chain!`,
                autoClose: 2000,
                closeButton: true,
              })
            } else{
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
                console.log(err)
                const address = await provider.getSigner().getAddress()
                apollo_query_time(address).then((data)=>{
                    const now = Math.floor(Date.now()/1000);
                    const timeoff = parseInt(data.data.colorings[0].blockTimestamp)+ 300 - now 
                    toast.update(toastId, {
                    isLoading: false,
                    type: "error",
                    render: `Oh no, wait for cooldown ${timeoff}s!`,
                    autoClose: 2000,
                    closeButton: true,
                  })
                }).catch((e)=>{
                  console.log(e)
                  toast.update(toastId, {
                          isLoading: false,
                          type: "error",
                          render: `Something wrong !`,
                          autoClose: 2000,
                          closeButton: true,
                        })
                })
              }
          }
    }}else{
      setDetail({"caller": "loading", 'timestamp':""})
      const ctx = canvas!.getContext('2d')
      const data = ctx?.getImageData(fullX ,fullY,1,1).data
      const color = rgbToHex(data![0],data![1],data![2])
      setIsInspect({entity: entity, x: x ,y: y,color: color})

      apollo_query({ 'entity':entity,'x': x,'y': y,"color":""})
      .then((data) => {
        // console.log('Subgraph data: ', data.data.colorings[0])
        const d = new Date(0)
        d.setUTCSeconds(data.data.colorings[0].blockTimestamp)
        const caller = data.data.colorings[0].caller.toString()
        setDetail({"caller": caller, 'timestamp':d.toLocaleString()})
      })
      .catch((err) => {
        console.log('Error fetching data: ', err)
        setDetail({"caller": "0x00", 'timestamp':"Never"})
      })
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



    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      ctx!.imageSmoothingEnabled = false;
      const imageData = ctx!.createImageData(80, 80);
      ctx!.imageSmoothingEnabled = false;

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map0.colorValues[i/4] != undefined && Map0.colorValues[i/4].type != null ){
          imageData.data[i + 0] = Map0.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map0.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map0.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 255 // R value
          imageData.data[i + 1] = 255 // G value
          imageData.data[i + 2] = 255; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,0,0);
    }, [Map0.colorValues])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      ctx!.imageSmoothingEnabled = false;
      const imageData = ctx!.createImageData(80, 80);
      ctx!.imageSmoothingEnabled = false;

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map1.colorValues[i/4] != undefined && Map1.colorValues[i/4].type != null){
          imageData.data[i + 0] = Map1.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map1.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map1.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,80,0);
    }, [Map1.colorValues])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map2.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map2.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map2.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map2.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,160,0);
    }, [Map2])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map3.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map3.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map3.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map3.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,240,0);
    }, [Map3])
    
    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map4.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map4.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map4.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map4.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,0,80);
    }, [Map4])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map5.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map5.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map5.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map5.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,80,80);
    }, [Map5])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map6.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map6.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map6.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map6.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,160,80);
    }, [Map6])

    useEffect(() => {
      const canvas = document.getElementsByTagName('canvas')[0];
      const ctx = canvas.getContext('2d')
      const imageData = ctx!.createImageData(80, 80);

        // Iterate through every pixel
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Modify pixel data
        if (Map7.colorValues[i/4] != undefined){
          imageData.data[i + 0] = Map7.colorValues[i/4].type?.r as number // R value
          imageData.data[i + 1] = Map7.colorValues[i/4].type?.g as number // G value
          imageData.data[i + 2] = Map7.colorValues[i/4].type?.b as number // B value
        }
        else{
          imageData.data[i + 0] = 244 // R value
          imageData.data[i + 1] = 244 // G value
          imageData.data[i + 2] = 244; // B value
        }
        imageData.data[i + 3] = 255; // A value
        }
        ctx!.putImageData(imageData,240,80);
    }, [Map7])

    return (
      <div className="pr-44">
              
      <div className="p-2 bg-white overflow-scroll " style={{ 
          transform: "scale("+zoom+")" ,
          transformOrigin: "10% 10%",
          boxSizing: "border-box",
          border: "1px solid black",
          }}>

        <canvas onClick={(e)=>delegate(e)} style={{  
          imageRendering: "pixelated",
          overflow: "hidden"
        }} 
         >

         </canvas>



        </div>
            {isInspect && pickcolor == 16 ?  (<Inspect inspect={isInspect} detail={detail}></Inspect>) : <></>}
      
          <div className="flex flex-col">
<input id="steps-range" type="range" min="1" max="19" value={zoom} onChange={event => setZoom(parseInt(event.target.value))} step="1" className="z-10 w-1/3  h-2 fixed bottom-10 left-1/2  transform  -translate-x-1/2  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

          </div>
  

      </div>
 
    );
  };
