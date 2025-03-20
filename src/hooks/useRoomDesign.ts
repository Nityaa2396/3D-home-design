import { useState, useCallback } from "react";
import { FurnitureItem } from "@/models/room";
import { v4 as uuidv4 } from "uuid";

interface RoomDimensions {
  width: number;
  length: number;
  height: number;
}

interface HistoryState {
  placedFurniture: FurnitureItem[];
}

export function useRoomDesign() {
  // Room dimensions
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    width: 5,
    length: 5,
    height: 3,
  });

  // Furniture state
  const [placedFurniture, setPlacedFurniture] = useState<FurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null);

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([{ placedFurniture: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Add to history
  const addToHistory = useCallback((newFurniture: FurnitureItem[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ placedFurniture: newFurniture });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Add furniture
  const addFurniture = useCallback((furniture: FurnitureItem) => {
    // Generate a unique ID if not provided
    const newFurniture = {
      ...furniture,
      id: furniture.id || uuidv4(),
    };
    
    const updatedFurniture = [...placedFurniture, newFurniture];
    setPlacedFurniture(updatedFurniture);
    setSelectedFurniture(newFurniture);
    addToHistory(updatedFurniture);
  }, [placedFurniture, addToHistory]);

  // Remove furniture
  const removeFurniture = useCallback((id: string) => {
    const updatedFurniture = placedFurniture.filter(item => item.id !== id);
    setPlacedFurniture(updatedFurniture);
    setSelectedFurniture(null);
    addToHistory(updatedFurniture);
  }, [placedFurniture, addToHistory]);

  // Move furniture
  const moveFurniture = useCallback((id: string, position: { x: number; y: number; z: number }) => {
    const updatedFurniture = placedFurniture.map(item => {
      if (item.id === id) {
        return { ...item, position };
      }
      return item;
    });
    
    setPlacedFurniture(updatedFurniture);
    setSelectedFurniture(updatedFurniture.find(item => item.id === id) || null);
    addToHistory(updatedFurniture);
  }, [placedFurniture, addToHistory]);

  // Rotate furniture
  const rotateFurniture = useCallback((id: string, rotation: number) => {
    const updatedFurniture = placedFurniture.map(item => {
      if (item.id === id) {
        return { ...item, rotation };
      }
      return item;
    });
    
    setPlacedFurniture(updatedFurniture);
    setSelectedFurniture(updatedFurniture.find(item => item.id === id) || null);
    addToHistory(updatedFurniture);
  }, [placedFurniture, addToHistory]);

  // Apply AI recommendation
  const applyAIRecommendation = useCallback((recommendation: any) => {
    setPlacedFurniture(recommendation.furniture);
    setSelectedFurniture(null);
    addToHistory(recommendation.furniture);
  }, [addToHistory]);

  // Undo action
  const undoAction = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPlacedFurniture(history[newIndex].placedFurniture);
      setSelectedFurniture(null);
    }
  }, [history, historyIndex]);

  // Redo action
  const redoAction = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPlacedFurniture(history[newIndex].placedFurniture);
      setSelectedFurniture(null);
    }
  }, [history, historyIndex]);

  return {
    roomDimensions,
    setRoomDimensions,
    placedFurniture,
    selectedFurniture,
    setSelectedFurniture,
    addFurniture,
    removeFurniture,
    moveFurniture,
    rotateFurniture,
    applyAIRecommendation,
    undoAction,
    redoAction,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
}