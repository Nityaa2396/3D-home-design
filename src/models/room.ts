export interface FurnitureItem {
  id: string;
  name: string;
  type: string;
  category: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  image?: string;
}

export interface RoomDesign {
  id: string;
  name: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  furniture: FurnitureItem[];
  wallColor: string;
  floorType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  furniture: FurnitureItem[];
  tags: string[];
}