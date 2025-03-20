import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Check } from "lucide-react";
import { FurnitureItem } from "@/models/room";

interface AIRecommendationsProps {
  roomDimensions: {
    width: number;
    length: number;
    height: number;
  };
  placedFurniture: FurnitureItem[];
  onApplyRecommendation: (recommendation: any) => void;
}

// Sample recommendation data
const sampleRecommendations = [
  {
    id: "rec-1",
    title: "Living Room Arrangement",
    description: "Optimal furniture placement for conversation and TV viewing.",
    furniture: [
      {
        id: "sofa-1",
        name: "Modern Sofa",
        type: "sofa",
        position: { x: -1.5, y: 0.4, z: 0 },
        rotation: 0,
        dimensions: { width: 2.0, height: 0.8, depth: 0.9 },
        category: "Seating",
      },
      {
        id: "chair-1",
        name: "Accent Chair",
        type: "chair",
        position: { x: 1, y: 0.45, z: 1 },
        rotation: -Math.PI / 4,
        dimensions: { width: 0.7, height: 0.9, depth: 0.7 },
        category: "Seating",
      },
      {
        id: "table-1",
        name: "Coffee Table",
        type: "table",
        position: { x: 0, y: 0.225, z: 0 },
        rotation: 0,
        dimensions: { width: 1.2, height: 0.45, depth: 0.6 },
        category: "Tables",
      },
    ],
    tags: ["Living Room", "Conversation Area"],
  },
  {
    id: "rec-2",
    title: "Bedroom Layout",
    description: "Cozy bedroom arrangement with optimal space utilization.",
    furniture: [
      {
        id: "bed-1",
        name: "Queen Bed",
        type: "bed",
        position: { x: 0, y: 0.25, z: 0 },
        rotation: 0,
        dimensions: { width: 1.6, height: 0.5, depth: 2.0 },
        category: "Bedroom",
      },
      {
        id: "cabinet-3",
        name: "Dresser",
        type: "cabinet",
        position: { x: -1.5, y: 0.4, z: -1 },
        rotation: 0,
        dimensions: { width: 1.2, height: 0.8, depth: 0.5 },
        category: "Storage",
      },
      {
        id: "table-3",
        name: "Side Table",
        type: "table",
        position: { x: 1, y: 0.3, z: -0.5 },
        rotation: 0,
        dimensions: { width: 0.5, height: 0.6, depth: 0.5 },
        category: "Tables",
      },
    ],
    tags: ["Bedroom", "Cozy", "Space-saving"],
  },
  {
    id: "rec-3",
    title: "Home Office Setup",
    description: "Productive workspace with ergonomic arrangement.",
    furniture: [
      {
        id: "table-2",
        name: "Desk",
        type: "table",
        position: { x: 0, y: 0.375, z: -1 },
        rotation: 0,
        dimensions: { width: 1.6, height: 0.75, depth: 0.9 },
        category: "Tables",
      },
      {
        id: "chair-2",
        name: "Office Chair",
        type: "chair",
        position: { x: 0, y: 0.45, z: 0 },
        rotation: 0,
        dimensions: { width: 0.5, height: 0.9, depth: 0.5 },
        category: "Seating",
      },
      {
        id: "cabinet-2",
        name: "Bookshelf",
        type: "cabinet",
        position: { x: 1.5, y: 0.9, z: -1 },
        rotation: 0,
        dimensions: { width: 0.8, height: 1.8, depth: 0.3 },
        category: "Storage",
      },
    ],
    tags: ["Office", "Productivity", "Ergonomic"],
  },
];

export default function AIRecommendations({
  roomDimensions,
  // placedFurniture,
  onApplyRecommendation,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState(sampleRecommendations);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate AI generating recommendations based on room dimensions and existing furniture
  const generateRecommendations = () => {
    setIsGenerating(true);

    // In a real app, this would be an API call to an AI service
    setTimeout(() => {
      // Adjust recommendations based on room dimensions
      const adjustedRecommendations = sampleRecommendations.map((rec) => {
        // Scale furniture positions based on room size
        const scaledFurniture = rec.furniture.map((item) => ({
          ...item,
          position: {
            x: item.position.x * (roomDimensions.width / 5),
            y: item.position.y,
            z: item.position.z * (roomDimensions.length / 5),
          },
        }));

        return {
          ...rec,
          furniture: scaledFurniture,
        };
      });

      setRecommendations(adjustedRecommendations);
      setIsGenerating(false);
    }, 2000);
  };

  // Generate initial recommendations when component mounts or room dimensions change
  useEffect(() => {
    generateRecommendations();
  }, [roomDimensions.width, roomDimensions.length]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">AI Recommendations</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRecommendations}
          disabled={isGenerating}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Refresh"}
        </Button>
      </div>

      {isGenerating ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <Wand2 className="mb-2 h-8 w-8 animate-pulse text-primary" />
            <p className="text-sm text-muted-foreground">
              Analyzing your space and generating recommendations...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id}>
              <CardContent className="p-4">
                <h4 className="font-medium">{recommendation.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {recommendation.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {recommendation.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    {recommendation.furniture.map((item) => (
                      <li key={item.id} className="flex items-center">
                        <span className="mr-1">•</span> {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 pt-3">
                <Button
                  className="w-full"
                  onClick={() => onApplyRecommendation(recommendation)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Apply This Design
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
