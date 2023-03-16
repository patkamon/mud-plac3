import { defineNumberComponent } from "@latticexyz/std-client";
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
  Counter: defineNumberComponent(world, {
    metadata: {
      contractId: "component.Position",
    },
  }),
};

export const clientComponents = {};
