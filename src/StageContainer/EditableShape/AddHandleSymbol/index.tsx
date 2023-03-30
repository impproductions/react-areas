import Konva from "konva";
import { Circle, Group, Line } from "react-konva";

interface Props {
    position: [number, number]
    onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void
}

export default function AddHandleSymbol({ position, onClick }: Props) {
    return (
        <Group
            x={position[0]}
            y={position[1]}
            onClick={onClick}
            opacity={0.5}
        >
            <Circle
                fill={"green"}
                radius={10}
            />
            <Line
                points={[
                    -5, 0,
                    5, 0
                ]}
                stroke={"white"}
                strokeWidth={3}
            />
            <Line
                points={[
                    0, -5,
                    0, 5
                ]}
                stroke={"white"}
                strokeWidth={3}
            />
        </Group>
    );
}
