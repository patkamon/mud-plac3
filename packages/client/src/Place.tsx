import { GameBoard } from "./Gameboard";
import { SyncState } from "@latticexyz/network";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Palette } from "./Palette";
import { useState } from "react";
import { Profile } from "./ConnectButton";
import { Search } from "./Search";


export const Place = () => {
  const [color, setColor] = useState(16);

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
    <div>
    {loadingState.state !== SyncState.LIVE ? (
        <div>
          {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
        </div>
      ) : (
        <div>
          
          <div className="fixed top-0 right-0 p-8 z-10">
            <Profile  />
          </div>
            <Search/>
        <Palette pickcolor={color} setcolor={setColor}/>
        <GameBoard pickcolor={color}/>
        </div>
      )} 
      </div>

  );
};