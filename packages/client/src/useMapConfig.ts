import { ethers } from "ethers";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { colorTypes, ColorType } from "./colorTypes";
import { EntityID } from "@latticexyz/recs";

export const useMapConfig = (id: string) => {
  const {
    components: { PlaceConfig },
    world
  } = useMUD();

  const placeConfig = useComponentValue(PlaceConfig, world.getEntityIndexStrict(id as EntityID));

  if (placeConfig == null) {
    throw new Error("game config not set or not ready, only use this hook after loading state === LIVE");
  }

  const { width, height, color } = placeConfig;
  const colorValues = Array.from(ethers.utils.toUtf8Bytes(color)).map((value, index) => ({
    x: index % width,
    y: Math.floor(index / width),
    value,
    type: value in ColorType ? colorTypes[value as ColorType] : null,
  }));

  return { width, height, color, colorValues };
};