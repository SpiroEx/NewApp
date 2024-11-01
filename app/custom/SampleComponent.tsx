import { us } from "@/hooks/useReactHooks";
import React, { useEffect, useState } from "react";

const SampleComponent = () => {
  const [count, setCount] = us(0);

  useEffect(() => {
    console.log("Count:", count); // Accessing count without adding it to dependencies
  }, [setCount]); // This should include [count] in dependencies

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default SampleComponent;
