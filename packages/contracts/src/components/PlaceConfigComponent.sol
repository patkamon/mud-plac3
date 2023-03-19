// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { BareComponent } from "solecs/BareComponent.sol";
import { LibTypes } from "solecs/LibTypes.sol";

uint256 constant ID = uint256(keccak256("component.PlaceConfig"));

struct PlaceConfig {
  uint32 width;
  uint32 height;
  bytes color;
}
struct Color {
  uint32 x;
  uint32 y;
  uint8 color;
}

contract PlaceConfigComponent is BareComponent {
  constructor(address world) BareComponent(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](3);
    values = new LibTypes.SchemaValue[](3);

    keys[0] = "width";
    values[0] = LibTypes.SchemaValue.UINT32;

    keys[1] = "height";
    values[1] = LibTypes.SchemaValue.UINT32;

    keys[2] = "color";
    values[2] = LibTypes.SchemaValue.STRING;
  }

  function set(uint entity, PlaceConfig memory placeConfig) public {
    set(entity, abi.encode(placeConfig.width, placeConfig.height, placeConfig.color));
  }

  function getValue(uint entity) public view returns (PlaceConfig memory) {
    (uint32 width, uint32 height, bytes memory color) = abi.decode(getRawValue(entity), (uint32, uint32, bytes));
    return PlaceConfig(width, height, color);
  }
}
