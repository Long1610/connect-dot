const arrleft = ["a", "b", "c", "d", "e", "f"];
const arrright = [
  { text: "g", sub: "g", id: "g" },
  { text: "h", sub: "h", id: "h" },
  { text: "i", sub: "i", id: "i" },
];
import { getElementPosition } from "./get-position";
import "./styles.scss";
import { useState } from "react";

const ConnectDiv = () => {
  const [lines, setLines] = useState([]);

  const [newLineSource, setNewLineSource] = useState(null);

  const handleCircleClick = (circleId) => {
    if (newLineSource && circleId !== newLineSource) {
      setLines((p) => [...p, { from: newLineSource, to: circleId }]);
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
            onClick={() => handleCircleClick(x)}
          >
            <div className="text">{x}</div>
            <div className="dot" id={x}></div>
          </div>
        ))}
      </div>
      {lines.map((line, idx) => {
        const sourcePos = getElementPosition(line.from);
        const targetPos = getElementPosition(line.to);
        const length = Math.sqrt(
          Math.pow(targetPos[0] - sourcePos[0], 2) +
            Math.pow(targetPos[1] - sourcePos[1], 2)
        );
        const angle =
          Math.atan2(targetPos[1] - sourcePos[1], targetPos[0] - sourcePos[0]) *
          (180 / Math.PI);

        if (!sourcePos || !targetPos) {
          console.error("Invalid source line, probably:", {
            line,
            sourcePos,
            targetPos,
          });
          return null;
        }

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              background: "red",
              width: length + "px",
              height: "2px",
              transform: `rotate(${angle}deg)`,
              left: sourcePos[0] + "px",
              top: targetPos[1] + "px",
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
