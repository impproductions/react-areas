import Konva from "konva";
import { ComponentPropsWithoutRef, useState } from "react";
import { Circle, Group } from "react-konva";
import { AreaShape } from "../types/geometry";
import AddHandleSymbol from "./AddHandleSymbol";
import ClosedLine from "./ClosedLine";
import VertexHandle from "./VertexHandle";

interface Props extends AreaShape, ComponentPropsWithoutRef<typeof Circle> {
    points: [number, number][];
    color: string;
}

export default function EditableShape({ points, color, ...props }: Props) {
    const [pointState, setPointState] = useState(points);

    return (
        <Group draggable>
            <ClosedLine
                points={pointState}
                color={color}
                {...props}
            />
            {pointState.map((p, i) => (
                <>
                    <VertexHandle
                        key={"vertex" + i}
                        position={p}
                        onDrag={(e: Konva.KonvaEventObject<DragEvent>) => {
                            points = pointState.slice();
                            points[i] = Object.values(e.target.position()) as [number, number];
                            setPointState(points);
                        }}
                        onDelete={() => {
                            points = pointState.slice();
                            points.splice(i, 1);
                            setPointState(points);
                        }}
                        canDelete={pointState.length > 3}
                    />
                    <AddHandleSymbol
                        key={"add" + i}
                        position={[
                            (pointState[i % pointState.length][0] + pointState[(i + 1) % pointState.length][0]) / 2,
                            (pointState[i % pointState.length][1] + pointState[(i + 1) % pointState.length][1]) / 2,
                        ]}
                        onClick={() => {
                            points = pointState.slice();
                            points.splice(i + 1, 0, [
                                (pointState[i % pointState.length][0] + pointState[(i + 1) % pointState.length][0]) / 2,
                                (pointState[i % pointState.length][1] + pointState[(i + 1) % pointState.length][1]) / 2,
                            ]);
                            setPointState(points);
                        }}
                    />
                </>
            ))}
        </Group>
    );
}