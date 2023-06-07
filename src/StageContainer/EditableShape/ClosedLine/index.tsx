import { Line } from "react-konva";

interface Props {
    points: [number, number][];
    color: string;
}

export default function ClosedLine({ points, color, ...props }: Props) {
    return (
        <Line
            closed
            points={points.flat()}
            fill={color}
            stroke="black"
            {...props}
        />
    );
}