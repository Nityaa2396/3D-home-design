import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { FurnitureItem } from "@/models/room";

// Sample furniture data
const furnitureData = [
  {
    category: "Seating",
    items: [
      {
        id: "sofa-1",
        name: "Modern Sofa",
        type: "sofa",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 2.0, height: 0.8, depth: 0.9 },
        category: "Seating",
      },
      {
        id: "chair-1",
        name: "Accent Chair",
        type: "chair",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.7, height: 0.9, depth: 0.7 },
        category: "Seating",
      },
      {
        id: "chair-2",
        name: "Dining Chair",
        type: "chair",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.5, height: 0.9, depth: 0.5 },
        category: "Seating",
      },
    ],
  },
  {
    category: "Tables",
    items: [
      {
        id: "table-1",
        name: "Coffee Table",
        type: "table",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.2, height: 0.45, depth: 0.6 },
        category: "Tables",
      },
      {
        id: "table-2",
        name: "Dining Table",
        type: "table",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.6, height: 0.75, depth: 0.9 },
        category: "Tables",
      },
      {
        id: "table-3",
        name: "Side Table",
        type: "table",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.5, height: 0.6, depth: 0.5 },
        category: "Tables",
      },
    ],
  },
  {
    category: "Storage",
    items: [
      {
        id: "cabinet-1",
        name: "TV Stand",
        type: "cabinet",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.8, height: 0.6, depth: 0.4 },
        category: "Storage",
      },
      {
        id: "cabinet-2",
        name: "Bookshelf",
        type: "cabinet",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.8, height: 1.8, depth: 0.3 },
        category: "Storage",
      },
      {
        id: "cabinet-3",
        name: "Dresser",
        type: "cabinet",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.2, height: 0.8, depth: 0.5 },
        category: "Storage",
      },
    ],
  },
  {
    category: "Bedroom",
    items: [
      {
        id: "bed-1",
        name: "Queen Bed",
        type: "bed",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.6, height: 0.5, depth: 2.0 },
        category: "Bedroom",
      },
      {
        id: "bed-2",
        name: "King Bed",
        type: "bed",
        image: "/placeholder.svg?height=100&width=150",
        dimensions: { width: 1.8, height: 0.5, depth: 2.1 },
        category: "Bedroom",
      },
    ],
  },
  {
    category: "Decor",
    items: [
      {
        id: "lamp-1",
        name: "Floor Lamp",
        type: "lamp",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.3, height: 1.5, depth: 0.3 },
        category: "Decor",
      },
      {
        id: "plant-1",
        name: "Indoor Plant",
        type: "plant",
        image: "/placeholder.svg?height=100&width=100",
        dimensions: { width: 0.4, height: 1.2, depth: 0.4 },
        category: "Decor",
      },
    ],
  },
];

interface FurnitureCatalogProps {
  onSelectFurniture: (furniture: FurnitureItem) => void;
}

export default function FurnitureCatalog({
  onSelectFurniture,
}: FurnitureCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredFurniture = furnitureData.flatMap((category) => {
    return category.items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || category.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  });

  const handleAddFurniture = (furniture: any) => {
    // Create a new furniture item with position
    const newFurniture: FurnitureItem = {
      ...furniture,
      position: { x: 0, y: furniture.dimensions.height / 2, z: 0 },
      rotation: 0,
    };
    onSelectFurniture(newFurniture);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search furniture..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-4 w-full justify-start overflow-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {furnitureData.map((category) => (
            <TabsTrigger key={category.category} value={category.category}>
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-2 gap-3">
            {filteredFurniture.map((item) => (
              <FurnitureCard
                key={item.id}
                furniture={item}
                onAdd={() => handleAddFurniture(item)}
              />
            ))}
          </div>
        </TabsContent>

        {furnitureData.map((category) => (
          <TabsContent
            key={category.category}
            value={category.category}
            className="mt-0"
          >
            <div className="grid grid-cols-2 gap-3">
              {category.items
                .filter((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <FurnitureCard
                    key={item.id}
                    furniture={item}
                    onAdd={() => handleAddFurniture(item)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface FurnitureCardProps {
  furniture: {
    id: string;
    name: string;
    type: string;
    image: string;
    dimensions: { width: number; height: number; depth: number };
    category: string;
  };
  onAdd: () => void;
}

function FurnitureCard({ furniture, onAdd }: FurnitureCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={furniture.image || "/placeholder.svg"}
          alt={furniture.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{furniture.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs">
              {furniture.dimensions.width}m × {furniture.dimensions.depth}m
            </Badge>
          </div>
          <Button size="icon" onClick={onAdd} className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
