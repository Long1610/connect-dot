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
  { text: "h", sub: "h", id: "h", color: "blue" },
  { text: "i", sub: "i", id: "i", color: "green" },
];

import { getElementPosition } from "./get-position";
import "./styles.scss";
import { useState } from "react";

const ConnectDiv = () => {
  const [lines, setLines] = useState([]);

  const [newLineSource, setNewLineSource] = useState(null);
  const [line, setLine] = useState({ from: { id: "" }, to: { id: "" } });

  const handleCircleClick = (value) => {
    const line = { from: newLineSource, to: value };
    setLine(line);
    //check if value exist in lines
    const isElementExist = lines?.some(
      (item) => item.from.id === value.id || item.to.id === value.id
    );

    //remove line when click
    if (isElementExist && !value.sub) {
      setLines((prevLines) =>
        prevLines.filter(
          (item) => item.from.id !== value.id && item.to.id !== value.id
        )
      );
      setNewLineSource(null);
      return;
    }

    // do nothing when choose the same right column
    if (value?.sub && newLineSource?.sub) {
      setNewLineSource(value);
      return;
    }

    // do nothing when choose the same left column
    if (!value?.sub && !newLineSource?.sub) {
      setNewLineSource(value);
      return;
    }

    if (newLineSource && value?.id !== newLineSource?.id) {
      setLines((prevLines) => [...prevLines, line]);

      setNewLineSource(null);
    } else if (!newLineSource) {
      setNewLineSource(value);
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
            className={`box-left ${
              [line?.from?.id, line?.to?.id].includes(x?.id) && "active"
            }`}
            onClick={() => handleCircleClick(x)}
          >
            <div className="text">{x.text}</div>
            <div className="dot" id={x.id}></div>
          </div>
        ))}
      </div>
      {Array.isArray(lines) &&
        lines?.map((line, idx) => {
          const sourcePos = getElementPosition(line.from.id);
          const targetPos = getElementPosition(line.to.id);

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
                background: line.from?.color ?? line.to?.color,
                width: length + "px",
                height: "2px",
                transform: `rotate(${angle}deg)`,
                left: xMid - length / 2 + "px",
                top: yMid + "px",
              }}
            ></div>
          );
        })}
      <div className="wrapper-text-right">
        {arrright.map((x, index) => (
          <div
            key={index}
            className={`box-right ${
              [line?.from?.id, line?.to?.id].includes(x?.id) && "active"
            }`}
            onClick={() => handleCircleClick(x)}
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
