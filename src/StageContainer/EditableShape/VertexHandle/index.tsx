import Konva from "konva";
import { Circle, Group, Text } from "react-konva";
import RemoveHandleSymbol from "./RemoveHandleSymbol";

interface Props {
    position: [number, number]
    canDelete: boolean
    onDrag: (e: Konva.KonvaEventObject<DragEvent>) => void
    onDelete: (e: Konva.KonvaEventObject<MouseEvent>) => void
}

export default function VertexHandle({ position, canDelete, onDrag, onDelete, ...props }: Props) {
    return (
        <Group
            x={position[0]}
            y={position[1]}
            onDragMove={onDrag}
            draggable
        >
            <Circle
                radius={10}
                opacity={0.3}
                stroke={"black"}
                fill={"grey"}
                {...props}
            />
            {
                canDelete && <RemoveHandleSymbol onClick={onDelete} />
            }
        </Group>
    );
}