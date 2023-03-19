// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/BareComponent.sol";
import { LibTypes } from "solecs/LibTypes.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

uint256 constant ID = uint256(keccak256("component.Player"));

struct Player {
  uint256 totalPixel;
  uint256 latestTime;
}

contract PlayerComponent is BareComponent {
  constructor(address world) BareComponent(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "totalPixel";
    values[0] = LibTypes.SchemaValue.UINT256;

    keys[1] = "latestTime";
    values[1] = LibTypes.SchemaValue.UINT256;
  }

  function set(uint entity, Player calldata player) public virtual {
    set(entity, abi.encode(player));
  }

  function getValue(uint256 entity) public view returns (Player memory) {
    (uint256 totalPixel, uint256 latestTime) = abi.decode(getRawValue(entity), (uint256, uint256));
    return Player(totalPixel, latestTime);
  }

  function getEntitiesWithValue(uint256 value) public view virtual returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(value));
  }
}
