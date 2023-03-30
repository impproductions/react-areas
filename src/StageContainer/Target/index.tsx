import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { ComponentPropsWithoutRef } from "react";
import { Circle, Group, Text } from "react-konva";

interface Props extends ComponentPropsWithoutRef<typeof Circle> {
    position: [number, number]
    onDrag: (pos: Vector2d | null) => void
}

export default function Target({ position, onDrag, ...props }: Props) {
    return (
        <Group
            x={position[0]}
            y={position[1]}
            onDragMove={(e) => {
                onDrag(e.target.position());
            }}
            draggable
        >
            <Circle
                radius={30}
                opacity={1}
                stroke={"black"}
                {...props}
            />
        </Group>

    );
}