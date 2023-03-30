import Konva from "konva";
import { useState } from "react";
import { Group } from "react-konva";
import { AreaShape } from "../types/geometry";
import ClosedLine from "./ClosedLine";
import VertexHandle from "./VertexHandle";

interface Props extends AreaShape {
    points: [number, number][];
    color: string;
}

export default function EditableShape({ points, color }: Props) {
    const [pointState, setPointState] = useState(points);

    return (
        <Group draggable>
            <ClosedLine
                points={pointState}
                color={color}
            />
            {points.map((p, i) => (
                <VertexHandle
                    position={p}
                    onDrag={(e: Konva.KonvaEventObject<DragEvent>) => {
                        points = pointState.slice();
                        points[i] = Object.values(e.target.position()) as [number, number];
                        setPointState(points);
                    }}
                />
            ))}
        </Group>
    );
}