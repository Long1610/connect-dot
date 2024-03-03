const arrleft = [
  { text: "a", id: "a" },
  { text: "b", id: "b" },
  { text: "c", id: "c" },
  { text: "d", id: "d" },
  { text: "e", id: "e" },
  { text: "f", id: "f" },
];
const arrright = [
  { text: "g", sub: "g", id: "g", color: "red" },
  { text: "h", sub: "h", id: "h", color: "red" },
  { text: "i", sub: "i", id: "i" },
];
import { getElementPosition } from "./get-position";
import "./styles.scss";
import { useState } from "react";

const ConnectDiv = () => {
  const [lines, setLines] = useState([]);

  const [newLineSource, setNewLineSource] = useState(null);

  const handleCircleClick = (circleId) => {
    const line = { from: newLineSource, to: circleId };
    const exclude = ["g", "h", "i"];
    const idsLeft = arrleft.map((x) => x.id);

    if (exclude.includes(circleId) && exclude.includes(newLineSource)) {
      setNewLineSource(null);
      setLines([]);
      return;
    }

    if (idsLeft.includes(circleId) && idsLeft.includes(newLineSource)) {
      setNewLineSource(null);
      setLines([]);
      return;
    }

    const isInclude = arrleft.map((x) => x.id).includes(circleId);
    const newLines = lines.some(
      (item) => item.from !== circleId && item.to !== circleId
    );

    if (lines.length > 0 && isInclude) {
      setLines(newLines);
    }

    console.log(circleId);
    console.log(newLineSource);

    console.log(exclude.includes(circleId));

    console.log(exclude.includes(newLineSource));

    if (newLineSource && circleId !== newLineSource) {
      setLines((p) => [...p, line]);
      setNewLineSource(null);
    } else if (!newLineSource) {
      setNewLineSource(circleId);
    } else {
      setNewLineSource(null);
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapper-text-left">
        {arrleft.map((x, index) => (
          <div
            key={index}
            className="box-left"
            onClick={() => handleCircleClick(x.id)}
          >
            <div className="text">{x.text}</div>
            <div className="dot" id={x.id}></div>
          </div>
        ))}
      </div>
      {Array.isArray(lines) &&
        lines?.map((line, idx) => {
          const sourcePos = getElementPosition(line.from);
          const targetPos = getElementPosition(line.to);

          const x1 = targetPos[0] + 4;
          const x2 = sourcePos[0] + 4;
          const y1 = targetPos[1] + 4;
          const y2 = sourcePos[1] + 4;

          const length = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
          const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

          if (!sourcePos || !targetPos) {
            console.error("Invalid source line, probably:", {
              line,
              sourcePos,
              targetPos,
            });
            return null;
          }
          const xMid = (x1 + x2) / 2;
          const yMid = (y1 + y2) / 2;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                background: "red",
                width: length + "px",
                height: "2px",
                transform: `rotate(${angle}deg)`,
                left: xMid - length / 2 + "px",
                top: yMid + "px",
              }}
              onClick={(lineIdx) =>
                setLines([
                  ...lines.slice(0, lineIdx),
                  ...lines.slice(lineIdx + 1),
                ])
              }
            ></div>
          );
        })}
      <div className="wrapper-text-right">
        {arrright.map((x, index) => (
          <div
            key={index}
            className="box-right"
            onClick={() => handleCircleClick(x.id)}
          >
            <div className="dot" id={x.id}></div>
            <div className="box-text">
              <div>{x.text}</div>
              <div>{x.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDiv;
