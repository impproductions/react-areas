import Konva from "konva";
import { Shape } from "konva/lib/Shape";
import { useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { Layer, Line, Stage } from "react-konva";
import EditableShape from "./EditableShape";
import style from "./style.module.css";
import { AreaShape } from "./types/geometry";

export default function StageContainer() {
    const stageRef = useRef<Konva.Stage>(null);


    const areas: AreaShape[] = [
        {
            name: "Triangle",
            points: [
                [10, 10],
                [50, 10],
                [35, 50],
            ]
        },
        {
            name: "Square",
            points: [
                [10, 10],
                [50, 10],
                [50, 50],
                [10, 50],
            ]
        },
        {
            name: "Weird",
            points: [
                [10, 10],
                [50, 10],
                [60, 50],
                [40, 50],
                [20, 20],
                [10, 20],
            ]
        },
    ];

    areas.forEach((a, j) => a.points.forEach((p, i) => a.points[i] = p.map(p => p * 5 + j * 50) as [number, number]))

    return (
        <div className={style.stageContainer}>
            <Stage height={500} width={500} ref={stageRef}>
                <Layer>
                    {
                        areas.map((a, i) => (
                            <EditableShape
                                name={a.name}
                                points={a.points}
                                key={"" + a + i}
                                color={[
                                    "red",
                                    "blue",
                                    "green"
                                ][i % 3]}
                            />
                        ))
                    }
                </Layer>
            </Stage>
        </div>
    );
}