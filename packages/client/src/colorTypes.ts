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
    r: number;
    g: number;
    b: number;
  };
  
  export const colorTypes: Record<ColorType, ColorConfig> = {
    [ColorType.Black]: {
      emoji: 'bg-[#000000]',
      r:0, g:0,b:0
    },
    [ColorType.Darkblue]: {
      emoji: "bg-[#1D2B53]",
      r:29, g:43,b:83
    },
    [ColorType.Darkpurple]: {
        emoji: "bg-[#7E2553]",
        r:126, g:37,b:83
    },
    [ColorType.Darkgreen]: {
        emoji: "bg-[#008751]",
        r:0, g:135,b:81
    },
    [ColorType.Brown]: {
        emoji: "bg-[#AB5236]",
        r:171, g:82,b:54
    },
    [ColorType.Darkgrey]: {
        emoji: "bg-[#5F574F]",
        r:95, g:87,b:79
    },
      [ColorType.Lightgrey]: {
        emoji: "bg-[#C2C3C7]",
        r:184, g:195,b:199
      },
      [ColorType.Red]: {
        emoji: "bg-[#FF004D]",
        r:255, g:0,b:77
      },
      [ColorType.Orange]: {
        emoji: "bg-[#FFA300]",
        r:255, g:163,b:0
      },
      [ColorType.Yellow]: {
        emoji: "bg-[#FFEC27]",
        r:255, g:236,b:39
      },
      [ColorType.Green]: {
        emoji: "bg-[#00E436]",
        r:0, g:228,b:54
      },
      [ColorType.Blue]: {
        emoji: "bg-[#29ADFF]",
        r:41, g:173,b:255
      },
      [ColorType.Lavender]: {
        emoji: "bg-[#83769C]",
        r:131, g:118,b:156
      },
      [ColorType.Pink]: {
        emoji: "bg-[#FF77A8]",
        r:255, g:119,b:168
      },
      [ColorType.Lightpeach]: {
        emoji: "bg-[#FFCCAA]",
        r:255, g:204,b:170
      },
  };