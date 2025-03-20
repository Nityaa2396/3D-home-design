import { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Box, Plane, useGLTF } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { FurnitureItem } from "@/models/room";

interface RoomSceneProps {
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  furniture: FurnitureItem[];
  onMoveFurniture: (
    id: string,
    position: { x: number; y: number; z: number }
  ) => void;
  onRotateFurniture: (id: string, rotation: number) => void;
  onRemoveFurniture: (id: string) => void;
}

export default function RoomScene({
  dimensions,
  furniture,
  onMoveFurniture,
  onRotateFurniture,
  onRemoveFurniture,
}: RoomSceneProps) {
  const { width, length, height } = dimensions;
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { camera } = useThree();

  // Create room walls and floor
  return (
    <group>
      {/* Floor */}
      <Plane
        args={[width, length]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>

      {/* Walls */}
      <Box
        args={[width, height, 0.1]}
        position={[0, height / 2, -length / 2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box
        args={[width, height, 0.1]}
        position={[0, height / 2, length / 2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box
        args={[0.1, height, length]}
        position={[width / 2, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box
        args={[0.1, height, length]}
        position={[-width / 2, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Furniture */}
      {furniture.map((item) => (
        <FurnitureModel
          key={item.id}
          item={item}
          isSelected={hovered === item.id}
          onSelect={() => setHovered(item.id)}
          onDeselect={() => setHovered(null)}
          onDragStart={() => setDragging(item.id)}
          onDragEnd={(position) => {
            setDragging(null);
            onMoveFurniture(item.id, position);
          }}
          onRotate={(rotation) => onRotateFurniture(item.id, rotation)}
        />
      ))}

      {/* Grid Helper */}
      <gridHelper args={[10, 10, "#888888", "#444444"]} />
    </group>
  );
}

interface FurnitureModelProps {
  item: FurnitureItem;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onDragStart: () => void;
  onDragEnd: (position: { x: number; y: number; z: number }) => void;
  onRotate: (rotation: number) => void;
}

function FurnitureModel({
  item,
  isSelected,
  onSelect,
  onDeselect,
  onDragStart,
  onDragEnd,
  onRotate,
}: FurnitureModelProps) {
  const ref = useRef<Mesh>(null);
  const { size, viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(
    new Vector3(item.position.x, item.position.y, item.position.z)
  );
  const [rotation, setRotation] = useState(item.rotation || 0);

  // For simplicity, we'll use basic geometries instead of loading actual models
  // In a real app, you would use useGLTF to load 3D models

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    onDragStart();
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setIsDragging(false);
    onDragEnd({
      x: position.x,
      y: position.y,
      z: position.z,
    });
    e.target.releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && ref.current) {
      const { clientX, clientY } = e;
      const x = (clientX / size.width) * 2 - 1;
      const y = -(clientY / size.height) * 2 + 1;

      // Convert screen coordinates to world coordinates
      // This is a simplified version - in a real app you'd use raycasting
      const newPosition = new Vector3(
        (x * viewport.width) / 2,
        item.position.y, // Keep the y position (height) constant
        (y * viewport.height) / 2
      );

      // Clamp to room boundaries
      newPosition.x = Math.max(-5, Math.min(5, newPosition.x));
      newPosition.z = Math.max(-5, Math.min(5, newPosition.z));

      setPosition(newPosition);
    }
  };

  const handleRotate = () => {
    const newRotation = rotation + Math.PI / 2;
    setRotation(newRotation);
    onRotate(newRotation);
  };

  // Determine color based on furniture type
  let color = "#8B4513"; // Default brown
  if (item.category === "Seating") color = "#1E88E5";
  if (item.category === "Tables") color = "#43A047";
  if (item.category === "Storage") color = "#FB8C00";
  if (item.category === "Decor") color = "#D81B60";

  return (
    <group
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
      onPointerOver={onSelect}
      onPointerOut={onDeselect}
    >
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onDoubleClick={handleRotate}
      >
        {/* Use different geometries based on furniture type */}
        {item.type === "sofa" && (
          <boxGeometry
            args={[
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
            ]}
          />
        )}
        {item.type === "chair" && (
          <boxGeometry
            args={[
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
            ]}
          />
        )}
        {item.type === "table" && (
          <boxGeometry
            args={[
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
            ]}
          />
        )}
        {item.type === "bed" && (
          <boxGeometry
            args={[
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
            ]}
          />
        )}
        {item.type === "cabinet" && (
          <boxGeometry
            args={[
              item.dimensions.width,
              item.dimensions.height,
              item.dimensions.depth,
            ]}
          />
        )}
        {item.type === "lamp" && (
          <cylinderGeometry args={[0.2, 0.2, item.dimensions.height, 16]} />
        )}
        {item.type === "plant" && (
          <cylinderGeometry args={[0.3, 0.3, item.dimensions.height, 16]} />
        )}

        <meshStandardMaterial
          color={isSelected ? "#FFD700" : color}
          emissive={isSelected ? "#FFD700" : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {/* Add a wireframe outline when selected */}
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry
            args={[
              item.dimensions.width + 0.05,
              item.dimensions.height + 0.05,
              item.dimensions.depth + 0.05,
            ]}
          />
          <meshBasicMaterial color="#FFD700" wireframe />
        </mesh>
      )}
    </group>
  );
}
