export interface ShopTheme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  backgroundColor?: string;
  textColor?: string;
  stickers?: Array<{
    id: number;
    content: string;
    position: {
      x: number;
      y: number;
    };
    rotation: number;
    scale: number;
  }>;
}
