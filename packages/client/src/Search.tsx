import { useState } from "react"
import { Card } from "./Card"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ethers } from "ethers";

export interface PlayerMetadata {
    address: string,
    timestamp: Date,
    totalPixel: number 
  }


export const Search = () => {

    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("0x")
    const [metadata, setMetadata] = useState({} as PlayerMetadata)

function onClick(e: any){
    e.preventDefault()
    if(search != "" ){
        setVisible(true)
        apollo_query(search)
    }
}

function onClose(e: any){
    e.preventDefault()
    setVisible(false)
}

function apollo_query(addr: string){
    //address to int to query
    let entity = ""
    try{
        entity = BigInt(ethers.BigNumber.from(addr)._hex).toString()
    }catch{
        entity = "addr"
    }


    const APIURL = 'https://api.studio.thegraph.com/query/44126/demo-plac3/1'
    const query = `
    query($compo: String, $entity:String) {
        componentValueSets(first: 1 orderBy:blockTimestamp orderDirection:desc
            where:{component: $compo 
              entity: $entity 
          }
        ) {
          data
          blockTimestamp
        }
      }
      `
    const d = new Date(0)
    setMetadata({"address": "loading","timestamp":d,totalPixel:0  })
    const client = new ApolloClient({
      uri: APIURL,
      cache: new InMemoryCache()
    })
    // "1070277919185040278246869633526450379282687227182"
    client
    .query({
      query: gql(query),
      variables:{
        compo: "0x7d731fcb6d6732c0572f82d888a685cc0ff6834c",
        entity: entity
      }
    }).then((data)=>{
        d.setUTCSeconds(data.data.componentValueSets[0].blockTimestamp)
        // parse byte
        const parse = ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256'], data.data.componentValueSets[0].data)
        console.log(parseInt(parse[0]._hex,16))

        setMetadata({"address": search,"timestamp":d,totalPixel:parseInt(parse[0]._hex,16)  })
        console.log({"address": search,"timestamp":d,totalPixel:parseInt(parse[0]._hex,16)  })
    }).catch((err)=>{
        console.log(err)
        setMetadata({"address": search,"timestamp":d,totalPixel:0  })
    })
}

return (
    <div>
    <form onSubmit={e=>onClick(e)} className="fixed top-4 z-10 left-1/2  transform  -translate-x-1/2">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" onChange={event => setSearch(event.target.value)} id="default-search" className="block  p-4 pl-10 w-[32rem] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address e.g., 0x00" required/>
        <button  type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>


<div id="popup-modal" tabIndex={-1} className={`top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 fixed  ${visible ? "" : "hidden"}  z-50  p-4`}>
    <div className="relative mx-auto top-1/4 w-full h-full max-w-3xl md:h-auto">
        <div className="relative  bg-white  rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={e=>onClose(e)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>

            <div className="p-12 text-center">
                <Card p={metadata} />
            </div>
        </div>
    </div>
</div>
</div>
)
}