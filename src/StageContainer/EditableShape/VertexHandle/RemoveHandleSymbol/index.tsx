import Konva from "konva";
import { Circle, Group, Line } from "react-konva";

interface Props {
    onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void
}

export default function RemoveHandleSymbol({ onClick }: Props) {
    return (
        <Group
            x={10}
            y={-10}
            onClick={onClick}
            opacity={0.5}
            rotation={45}
        >
            <Line
                points={[
                    -5, 0,
                    5, 0
                ]}
                stroke={"red"}
                strokeWidth={3}
            />
            <Line
                points={[
                    0, -5,
                    0, 5
                ]}
                stroke={"red"}
                strokeWidth={3}
            />
        </Group>
    );
}
