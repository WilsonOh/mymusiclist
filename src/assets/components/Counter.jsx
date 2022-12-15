import { useState } from "react";

const Counter = ({ start }) => {
  const [count, setCount] = useState(start || 0);

  return (
    <div>
      <h1>Here&apos;s the current count: {count} </h1>
      <div>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Click Me to increase!
        </button>
        <button onClick={() => setCount((prev) => prev - 1)}>
          Click Me to decrease!
        </button>
      </div>
    </div>
  );
};

export default Counter;
