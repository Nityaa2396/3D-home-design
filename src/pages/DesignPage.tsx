// import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
import { Save, Share, Undo, Redo, ZoomIn, ZoomOut, Trash2 } from "lucide-react"; //Wand2,
import RoomScene from "@/components/features/RoomScene";
import FurnitureCatalog from "@/components/features/FurnitureCatalog";
import AIRecommendations from "@/components/features/AIRecommendations";
import { useToast } from "@/hooks/use-toast";
// import { useMobile } from "@/hooks/use-mobile";
import { useRoomDesign } from "@/hooks/useRoomDesign";

export default function DesignPage() {
  const { toast } = useToast();
  // const isMobile = useMobile();
  const {
    roomDimensions,
    setRoomDimensions,
    selectedFurniture,
    placedFurniture,
    addFurniture,
    removeFurniture,
    moveFurniture,
    rotateFurniture,
    applyAIRecommendation,
    undoAction,
    redoAction,
    canUndo,
    canRedo,
  } = useRoomDesign();

  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your room design has been saved successfully.",
    });
  };

  const handleShareDesign = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full border-r md:w-80">
        <Tabs defaultValue="furniture">
          <div className="border-b p-4">
            <TabsList className="w-full">
              <TabsTrigger value="furniture" className="flex-1">
                Furniture
              </TabsTrigger>
              <TabsTrigger value="room" className="flex-1">
                Room
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1">
                AI
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="furniture"
            className="h-[calc(100vh-12rem)] overflow-y-auto p-4"
          >
            <FurnitureCatalog onSelectFurniture={addFurniture} />
          </TabsContent>

          <TabsContent value="room" className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="room-width">Room Width (m)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="room-width"
                    min={2}
                    max={10}
                    step={0.1}
                    value={[roomDimensions.width]}
                    onValueChange={(value) =>
                      setRoomDimensions({ ...roomDimensions, width: value[0] })
                    }
                  />
                  <Input
                    type="number"
                    value={roomDimensions.width}
                    onChange={(e) =>
                      setRoomDimensions({
                        ...roomDimensions,
                        width: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-16"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="room-length">Room Length (m)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="room-length"
                    min={2}
                    max={10}
                    step={0.1}
                    value={[roomDimensions.length]}
                    onValueChange={(value) =>
                      setRoomDimensions({ ...roomDimensions, length: value[0] })
                    }
                  />
                  <Input
                    type="number"
                    value={roomDimensions.length}
                    onChange={(e) =>
                      setRoomDimensions({
                        ...roomDimensions,
                        length: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-16"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="room-height">Room Height (m)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="room-height"
                    min={2}
                    max={5}
                    step={0.1}
                    value={[roomDimensions.height]}
                    onValueChange={(value) =>
                      setRoomDimensions({ ...roomDimensions, height: value[0] })
                    }
                  />
                  <Input
                    type="number"
                    value={roomDimensions.height}
                    onChange={(e) =>
                      setRoomDimensions({
                        ...roomDimensions,
                        height: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-16"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label>Wall Color</Label>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {["#FFFFFF", "#F5F5DC", "#E6E6FA", "#E0FFFF", "#FAEBD7"].map(
                    (color) => (
                      <div
                        key={color}
                        className="h-8 w-full cursor-pointer rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          toast({
                            title: "Wall Color Updated",
                            description: "The wall color has been updated.",
                          });
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              <div>
                <Label>Floor Type</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {["Hardwood", "Carpet", "Tile", "Laminate"].map((floor) => (
                    <Button
                      key={floor}
                      variant="outline"
                      className="justify-start"
                      onClick={() => {
                        toast({
                          title: "Floor Updated",
                          description: `Floor changed to ${floor}.`,
                        });
                      }}
                    >
                      {floor}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="ai"
            className="h-[calc(100vh-12rem)] overflow-y-auto p-4"
          >
            <AIRecommendations
              roomDimensions={roomDimensions}
              placedFurniture={placedFurniture}
              onApplyRecommendation={applyAIRecommendation}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* 3D Canvas */}
      <div className="relative flex-1">
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={undoAction}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={redoAction}
            disabled={!canRedo}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <Button variant="default" onClick={handleSaveDesign}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={handleShareDesign}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <RoomScene
            dimensions={roomDimensions}
            furniture={placedFurniture}
            onMoveFurniture={moveFurniture}
            onRotateFurniture={rotateFurniture}
            onRemoveFurniture={removeFurniture}
          />
        </Canvas>

        {selectedFurniture && (
          <Card className="absolute right-4 top-4 z-10 w-64">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedFurniture.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFurniture.category}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFurniture(selectedFurniture.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
