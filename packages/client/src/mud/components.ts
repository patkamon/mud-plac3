import { world } from "./world";
import { defineComponent, Type } from "@latticexyz/recs";


export const contractComponents = {
  PlaceConfig: defineComponent(
    world,
    {
      width: Type.Number,
      height: Type.Number,
      color: Type.String,
    },
    {
      id: "PlaceConfig",
      metadata: { contractId: "component.PlaceConfig" },
    }
  ),
  Player: defineComponent(world, 
    {
      totalPixel: Type.Number,
      latestTime: Type.Number
    },
    {
      id: "Player",
      metadata: { contractId: "component.Player" },
    }),
};

export const clientComponents = {};
