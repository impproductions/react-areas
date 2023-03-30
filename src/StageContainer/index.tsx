import Konva from "konva";
import { Shape } from "konva/lib/Shape";
import { useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { Layer, Line, Stage } from "react-konva";
import tinycolor from "tinycolor2";
import EditableShape from "./EditableShape";
import style from "./style.module.css";
import Target from "./Target";
import { AreaShape } from "./types/geometry";

export default function StageContainer() {
    const stageRef = useRef<Konva.Stage>(null);
    const [activeShapes, setActiveShapes] = useState<Shape[]>();
    const areas: AreaShape[] = [
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

    return (
        <div className={style.stageContainer}>
            <div className={style.areaIdentifier} style={{ backgroundColor: activeShapes?.[0]?.fill()}}>
            </div>
            <Stage height={500} width={500} ref={stageRef}>
                <Layer>
                    {
                        areas.map((a, i) => (
                            <EditableShape
                                id={a.name.toLowerCase() + "-shape"}
                                name={a.name}
                                points={a.points}
                                key={"" + a + i}
                                color={[
                                    "rgba(155, 0, 0, 1)",
                                    "rgba(0, 155, 0, 1)",
                                    "rgba(0, 0, 155, 1)",
                                    "rgba(155, 155, 0, 1)",
                                ][i % 4]}
                            />
                        ))
                    }
                    <Target
                        id="target-shape"
                        position={[25, 25]}
                        onDrag={(pos) => {
                            const intersections = stageRef.current?.getAllIntersections(pos)
                                .filter(s => s?.id() != "target-shape" && s?.id()?.includes("-shape"))
                            setActiveShapes(intersections)
                        }}
                        fill={
                            activeShapes?.[0]?.fill() || "white"
                        }
                    />
                </Layer>
            </Stage>
        </div>
    );
}