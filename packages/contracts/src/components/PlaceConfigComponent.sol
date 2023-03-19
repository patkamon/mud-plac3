// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { BareComponent } from "solecs/BareComponent.sol";
import { LibTypes } from "solecs/LibTypes.sol";
// import { SingletonID } from "solecs/SingletonID.sol";

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

    keys[2] = "painter";
    values[2] = LibTypes.SchemaValue.UINT256_ARRAY;

    keys[2] = "timestamp";
    values[2] = LibTypes.SchemaValue.UINT256_ARRAY;
  }

  // function set(PlaceConfig memory placeConfig) public {
  //   set(SingletonID, abi.encode(placeConfig.width, placeConfig.height, placeConfig.color));
  // }

  function set(uint entity, PlaceConfig memory placeConfig) public {
    set(entity, abi.encode(placeConfig.width, placeConfig.height, placeConfig.color));
  }

  // function set2(Color calldata c) public {
  //   PlaceConfig memory placeConfig = getValue();
  //   placeConfig.color[(c.y * placeConfig.width) + c.x] = bytes1(c.color);
  //   set(SingletonID, abi.encode(placeConfig.width, placeConfig.height, placeConfig.color));
  // }

  // function getValue() public view returns (PlaceConfig memory) {
  //   (uint32 width, uint32 height, bytes memory color) = abi.decode(getRawValue(SingletonID), (uint32, uint32, bytes));
  //   return PlaceConfig(width, height, color);
  // }

  function getValue(uint entity) public view returns (PlaceConfig memory) {
    (uint32 width, uint32 height, bytes memory color) = abi.decode(getRawValue(entity), (uint32, uint32, bytes));
    return PlaceConfig(width, height, color);
  }
}
