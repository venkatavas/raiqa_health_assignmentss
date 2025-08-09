import React, { useState, useMemo } from "react";

interface ListViewProps {
  numberList: number[];
  onClearList: () => void;
  onDeleteNumber: (index: number) => void;
}

type SortOrder = "none" | "asc" | "desc";

export default function ListView({
  numberList,
  onClearList,
  onDeleteNumber,
}: ListViewProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const sortedNumbers = useMemo(() => {
    if (sortOrder === "none") return numberList;

    return [...numberList].sort((a, b) => {
      return sortOrder === "asc" ? a - b : b - a;
    });
  }, [numberList, sortOrder]);

  const toggles = () => {
    setSortOrder((current) => {
      if (current === "none") return "asc";
      if (current === "asc") return "desc";
      return "none";
    });
  };

  const getSortText = () => {
    switch (sortOrder) {
      case "none":
        return "Sort";
      case "asc":
        return "Sort ↑";
      case "desc":
        return "Sort ↓";
    }
  };

  // Find min and max for highlighting
  //const nums = numberList.map(Number);
  const minNum = numberList.length > 0 ? Math.min(...numberList) : null;
  const maxNum = numberList.length > 0 ? Math.max(...numberList) : null;

  const getItemClass = (num: number) => {
    if (numberList.length <= 1) return "";
    if (num === minNum && num === maxNum) return "";
    if (num === minNum) return "min";
    if (num === maxNum) return "max";
    return "";
  };

  return (
    <div className="listview">
      <div className="list-header">
        <h2>Numbers List</h2>
        <div className="list-controls">
          <button
            className="reset-btn"
            onClick={onClearList}
            disabled={numberList.length === 0}
          >
            Reset
          </button>
          <button className="sort-btn" onClick={toggles}>
            {getSortText()}
          </button>
        </div>
      </div>

      {numberList.length === 0 ? (
        <div className="empty-state">
          No numbers added yet. Use the counter above to add numbers!
        </div>
      ) : (
        <>
          <ul className="number-list">
  {sortedNumbers.map((num, index) => {
    // Correctly get the original index without breaking duplicates
    const originalIndex = numberList.indexOf(num);
    return (
      <li key={`${num}-${index}`} className={getItemClass(num)}>
        <span className="number-item">
          <span className="main-number">{num}</span>{" "}
          <span className="number-index">#{originalIndex + 1}</span>
        </span>
        <button
          className="delete-btn"
          onClick={() => onDeleteNumber(originalIndex)}
          title="Delete this number"
        >
          ×
        </button>
      </li>
    );
  })}
</ul>
          <div className="info-bar">Total numbers: {numberList.length}</div>
        </>
      )}
    </div>
  );
}
