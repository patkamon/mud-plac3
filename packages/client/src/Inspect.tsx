import { useState } from "react";
import { Detail, InspectData } from "./Gameboard";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'


export async function apollo_query(inspect: InspectData){

  const APIURL = 'https://api.studio.thegraph.com/query/44126/demo-plac3/1'
  const query = `
  query($x: String, $y: String, $entity: String) {
    colorings(first: 1 orderBy:blockTimestamp orderDirection:desc where: {x:$x y:$y entity:$entity}) {
      caller
      blockTimestamp
    }
  }
    `
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache()
  })

  console.log({
    x: inspect?.x.toString(),
    y: inspect?.y.toString(),
    entity: inspect.entity.toString()
  })
  return client
  .query({
    query: gql(query),
    variables:{
      x: inspect?.x.toString(),
      y: inspect?.y.toString(),
      entity: inspect.entity.toString()
    }
  })
  // .then((data) => {
  //   console.log('Subgraph data: ', data.data.colorings[0])
  //   // setCaller(data.data.colorings[0].caller)
  //   d.setUTCSeconds(data.data.colorings[0].blockTimestamp)
  //   const caller = data.data.colorings[0].caller.toString()
  //   // setTimestamp(d)

  // })
  // .catch((err) => {
  //   console.log('Error fetching data: ', err)
  // })
}
   

export const Inspect = ({inspect,detail}: {inspect: InspectData,detail: Detail | null}) => {

  // const [caller, setCaller] = useState("0x00")
  // const [timestamp, setTimestamp] = useState(new Date(0))

  const offsetX = inspect.entity %4;
  const offsetY = Math.floor(inspect.entity /4);



    return (

      <div  className={`flex flex-col absolute ${inspect?.color} top-1/2 right-4 rounded-lg border border-white border-4  transform  -translate-y-1/2 `}>
          <div className="px-6 pt-4 pb-2 flex flex-col">
            <p>painter:{detail?.caller != "0x00" ? detail?.caller.substring(0,4) + "..." + detail?.caller.substring(detail?.caller.length-4,detail?.caller.length): "0x00"}</p>
            <p>time:{detail?.timestamp != new Date(0) ? detail?.timestamp.toLocaleString() : ""}</p>
          </div>
          <div className="px-6 pt-4 pb-2 flex">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">x: {inspect?.x + (80* offsetX)}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">y: {inspect?.y + (80* offsetY)}</span>
  </div>


      </div>
    );
  };