import Konva from "konva";
import { Circle } from "react-konva";

interface Props {
    position: [number, number]
    onDrag: (e: Konva.KonvaEventObject<DragEvent>) => void
}

export default function VertexHandle({ position, onDrag }: Props) {
    return (
        <Circle
            x={position[0]}
            y={position[1]}
            radius={10}
            opacity={0.3}
            stroke={"black"}
            fill={"grey"}
            onDragMove={onDrag}
            draggable
        />
    );
}