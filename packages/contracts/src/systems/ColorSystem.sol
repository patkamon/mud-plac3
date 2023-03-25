// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { PlaceConfigComponent, ID as PlaceConfigComponentID, PlaceConfig, Color } from "components/PlaceConfigComponent.sol";
import { PlayerComponent, ID as PlayerComponentID, Player } from "components/PlayerComponent.sol";
import { ColorType as Z } from "../ColorType.sol";

uint256 constant ID = uint256(keccak256("system.Move"));

contract ColorSystem is System {
  event Coloring(address caller, uint32 x, uint32 y, uint entity, uint8 color);

  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory args) public returns (bytes memory) {
    (uint256 entity, Color memory c) = abi.decode(args, (uint, Color));
    return executeTyped(entity, c);
  }

  function executeTyped(uint entity, Color memory placeConfig) public returns (bytes memory) {
    PlaceConfigComponent place = PlaceConfigComponent(getAddressById(components, PlaceConfigComponentID));
    PlaceConfig memory map = place.getValue(entity);
    map.color[(placeConfig.y * map.width) + placeConfig.x] = bytes1(placeConfig.color);
    place.set(entity, map);

    uint playerEntity = addressToEntity(msg.sender);
    PlayerComponent p = PlayerComponent(getAddressById(components, PlayerComponentID));
    Player memory player = p.has(playerEntity) ? p.getValue(playerEntity) : Player(0, 0);
    uint total = player.totalPixel;
    require(block.timestamp > player.latestTime + 5 minutes, "You still have a cooldown!");
    p.set(playerEntity, Player(total + 1, block.timestamp));

    emit Coloring(msg.sender, placeConfig.x, placeConfig.y, entity, placeConfig.color);
  }
}
