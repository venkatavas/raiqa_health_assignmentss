import React, { useState } from "react";

interface CounterProps {
  onAddNum: (num: number) => void;
}

export default function Counter({ onAddNum }: CounterProps) {
  const [counting, setCount] = useState(0);
  const addToList = () => {
    if (counting > 0) {
      onAddNum(counting);
      setCount(0);
    }
  };
  const increment = () => {
    setCount(counting + 1);
  };

  const decrease = () => {
    if (counting > 0) {
      setCount(counting - 1);
    }
  };
  return (
    <div className="counter">
      <div className="counter-row">
        <button
          className="counter-btn"
          onClick={decrease}
          disabled={counting === 0}
        >
          −
        </button>
        <div className="count-display">{counting}</div>
        <button className="counter-btn" onClick={increment}>
          +
        </button>
      </div>
      <button className="add-btn" onClick={addToList} disabled={counting === 0}>
        Add to List
      </button>
    </div>
  );
}
