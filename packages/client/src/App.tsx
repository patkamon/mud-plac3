import { GameBoard } from "./Gameboard";
import { SyncState } from "@latticexyz/network";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Palette } from "./Palette";
import { useState } from "react";

export const App = () => {
  const [color, setColor] = useState(0);

  const {
    components: { LoadingState },
    singletonEntity,
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: "Connecting",
    percentage: 0,
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
         {loadingState.state !== SyncState.LIVE ? (
        <div>
          {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
        </div>
      ) : (
        <div >
        <Palette setcolor={setColor}/>
        <GameBoard pickcolor={color}/>
        </div>
      )}
    </div>
  );
};