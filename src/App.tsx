import React, { useState, useEffect } from "react";
import Counter from "./components/Counter";
import ListView from "./components/ListView";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const saveNumb = localStorage.getItem("raiqa-numbers");
    if (saveNumb) {
      setNumbers(JSON.parse(saveNumb));
    }
  }, []);

  // Save to localStorage whenever numbers change
  useEffect(() => {
    localStorage.setItem("raiqa-numbers", JSON.stringify(numbers));
  }, [numbers]);

  const clear = () => {
    setNumbers([]);
  };
  const addNumbers = (num: number) => {
    if (num > 0 && !numbers.includes(num)) {
      setNumbers([...numbers, num]);
    }
  };
  const deleteNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  return (
    <div className="app1">
      <header>
        <h1>Counter & List App</h1>
      </header>
      <Counter onAddNum={addNumbers} />
      <ListView
        numberList={numbers}
        onClearList={clear}
        onDeleteNumber={deleteNumber}
      />
    </div>
  );
}

export default App;
