import { Detail, InspectData } from "./Gameboard";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { usedchain } from "./mud/config";


export async function apollo_query(inspect: InspectData){

  const APIURL = usedchain.graphURL
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


  return client
  .query({
    query: gql(query),
    variables:{
      x: inspect?.x.toString(),
      y: inspect?.y.toString(),
      entity: inspect.entity.toString()
    }
  })
}
   
export async function apollo_query_time(caller: string){

  const APIURL = usedchain.graphURL
  const query = `
  query($caller: String) {
    colorings(first: 1 orderBy: blockTimestamp orderDirection: desc where: {caller: $caller}) {
      blockTimestamp
    }
  }
    `
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache()
  })


  return client
  .query({
    query: gql(query),
    variables:{
      caller: caller,
    }
  })
}
   


export const Inspect = ({inspect,detail}: {inspect: InspectData,detail: Detail | null}) => {


  const offsetX = inspect.entity %4;
  const offsetY = Math.floor(inspect.entity /4);
  console.log(inspect)

    return ( <div  style={{ backgroundColor: inspect.color }}
    className={`flex flex-col fixed top-1/2 right-4 rounded-lg  ${inspect?.color == '#ffffff' ? "border-gray-500":  "border-white"} border-4  transform  -translate-y-1/2 `}>
{ detail?.caller != "loading" ? ( 
     <div>
          <div style={{
            color: inspect?.color != "#ffffff" && inspect?.color != "#ffec27" && inspect?.color != "#ffccaa" ? "white": "black"
          }}
          className={`px-6 pt-4 pb-2 flex flex-col font-mono text-lg }`}>
            
            {usedchain.graphURL == undefined ? <i className="text-red-400">** This chain is not <br/> support the graph **</i> : <><p>Painter:{detail?.caller != "0x00" ? 
              // " "+detail?.caller.substring(0,4) + "..." + detail?.caller.substring(detail?.caller.length-4,detail?.caller.length) 
              detail?.caller
              : " 0x00"}</p>
            <p>Timestamp:{detail?.caller != "0x00" ? detail?.timestamp: " Never"}</p>
            </>
            }
          </div>
      
          <div className="px-6 pt-4 pb-2 flex justify-center">
    <span className="font-mono text-2xl inline-block bg-gray-200 rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">x: {inspect?.x + (80* offsetX)}</span>
    <span className="font-mono text-2xl inline-block bg-gray-200 rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">y: {inspect?.y + (80* offsetY)}</span>
  </div>
  </div>


) : <div role="status" className="flex py-10 px-20 flex-row justify-center">
<svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
<span className="sr-only">Loading...</span>
</div>}
      </div>
    );
  };