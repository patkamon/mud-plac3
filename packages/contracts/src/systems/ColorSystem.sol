// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { PlaceConfigComponent, ID as PlaceConfigComponentID, PlaceConfig } from "components/PlaceConfigComponent.sol";
import { ColorType as Z } from "../ColorType.sol";

uint256 constant ID = uint256(keccak256("system.Move"));
struct Color {
  uint32 x;
  uint32 y;
  uint8 color;
}

contract ColorSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory args) public returns (bytes memory) {
    return executeTyped(abi.decode(args, (Color)));
  }

  function executeTyped(Color memory placeConfig) public returns (bytes memory) {
    // uint256 entityId = addressToEntity(msg.sender);
    PlaceConfigComponent place = PlaceConfigComponent(getAddressById(components, PlaceConfigComponentID));
    PlaceConfig memory map = place.getValue();
    uint32 width = map.width;
    uint32 x = placeConfig.x;
    uint32 y = placeConfig.y;
    map.color[(y * width) + x] = bytes1(placeConfig.color);
    place.set(map);
  }
}
