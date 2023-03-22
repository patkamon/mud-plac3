export enum ColorType {
    Black =1,
    Darkblue ,
    Darkpurple,
    Darkgreen,
    Brown,
    Darkgrey,
    Lightgrey,
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Lavender,
    Pink,
    Lightpeach
  }
  
  type ColorConfig = {
    emoji: string;
  };
  
  export const colorTypes: Record<ColorType, ColorConfig> = {
    [ColorType.Black]: {
      emoji: 'bg-[#000000]',
    },
    [ColorType.Darkblue]: {
      emoji: "bg-[#1D2B53]",
    },
    [ColorType.Darkpurple]: {
        emoji: "bg-[#7E2553]",
    },
    [ColorType.Darkgreen]: {
        emoji: "bg-[#008751]",
    },
    [ColorType.Brown]: {
        emoji: "bg-[#AB5236]",
    },
    [ColorType.Darkgrey]: {
        emoji: "bg-[#5F574F]",
    },
      [ColorType.Lightgrey]: {
        emoji: "bg-[#C2C3C7]",
      },
      [ColorType.Red]: {
        emoji: "bg-[#FF004D]",
      },
      [ColorType.Orange]: {
        emoji: "bg-[#FFA300]",
      },
      [ColorType.Yellow]: {
        emoji: "bg-[#FFEC27]",
      },
      [ColorType.Green]: {
        emoji: "bg-[#00E436]",
      },
      [ColorType.Blue]: {
        emoji: "bg-[#29ADFF]",
      },
      [ColorType.Lavender]: {
        emoji: "bg-[#83769C]",
      },
      [ColorType.Pink]: {
        emoji: "bg-[#FF77A8]",
      },
      [ColorType.Lightpeach]: {
        emoji: "bg-[#FFCCAA]",
      },
  };