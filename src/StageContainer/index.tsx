import Konva from "konva";
import { Shape } from "konva/lib/Shape";
import { useMemo, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import EditableShape from "./EditableShape";
import style from "./style.module.css";
import Target from "./Target";
import { AreaShape } from "./types/geometry";
import { debounce } from "lodash";
import { Vector2d } from "konva/lib/types";

const testAreas: AreaShape[] = [
    {
        name: "ONE",
        points: [
            [30, 30],
            [300, 30],
            [300, 200],
            [30, 200],
        ]
    },
    {
        name: "TWO",
        points: [
            [330, 30],
            [470, 30],
            [470, 450],
            [330, 200],
        ]
    },
    {
        name: "THREE",
        points: [
            [316, 230],
            [450, 460],
            [180, 460],
            [180, 345],
            [250, 345],
            [250, 230],
        ]
    },
    {
        name: "FOUR",
        points: [
            [30, 230],
            [220, 230],
            [220, 315],
            [150, 315],
            [150, 460],
            [30, 460],
        ]
    },
];

export default function StageContainer({ areas = testAreas }: { areas?: typeof testAreas }) {
    const stageRef = useRef<Konva.Stage>(null);
    const [activeShapes, setActiveShapes] = useState<Shape>();

    const onTargetDrag = (pos: Vector2d | null) => {
        if (pos) setActiveShapes(stageRef.current?.getIntersection(pos));
    }

    return (
        <div className={style.stageContainer}>
            <div className={style.areaIdentifier} style={{ backgroundColor: activeShapes?.fill() }}>
            </div>
            <Stage height={500} width={500} ref={stageRef}>
                <Layer id="shapes">
                    {
                        areas.map((a, i) => (
                            <EditableShape
                                id={a.name.toLowerCase() + "-shape"}
                                name={"intersectable-shape"}
                                points={a.points}
                                key={i}
                                color={[
                                    "rgba(155, 0, 0, 1)",
                                    "rgba(0, 155, 0, 1)",
                                    "rgba(0, 0, 155, 1)",
                                    "rgba(155, 155, 0, 1)",
                                ][i % 4]}
                            />
                        ))
                    }
                </Layer>
                <Layer>
                    <Target
                        id="target-shape"
                        position={[25, 25]}
                        onDrag={onTargetDrag}
                        fill={
                            activeShapes?.fill() || "white"
                        }
                    />
                </Layer>
            </Stage>
        </div>
    );
}