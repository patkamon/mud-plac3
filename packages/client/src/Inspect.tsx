import { InspectData } from "./Gameboard";


export const Inspect = ({inspect}: {inspect: InspectData}) => {

  const offsetX = inspect.entity %4;
  const offsetY = Math.floor(inspect.entity /4);
    return (

      <div className={`flex flex-col absolute ${inspect?.color} top-1/2 right-4 rounded-lg border border-white border-4  transform  -translate-y-1/2 `}>
          <div className="px-6 pt-4 pb-2 flex flex-col">
            <p>painter:</p>
            <p>time:</p>
          </div>
          <div className="px-6 pt-4 pb-2 flex">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">x: {inspect?.x + (80* offsetX)}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">y: {inspect?.y + (80* offsetY)}</span>
  </div>
      </div>
    );
  };