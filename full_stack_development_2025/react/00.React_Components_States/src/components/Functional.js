import React, { useState } from "react";

 function CounterFunctional() {
  // const [count, setCount] = useState(1000000);
  const [ num , setNum] = useState("f");

  const increse=()=>{
    setNum(num + "u")
  }

  // const increment = () => {
  //   setCount(count + 1);
  // };

  // const decrement = () => {
  //   setCount(count - 1);
  // };

  return (
    <div>
      {/* <h2>Counter (Functional)</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button> */}
      <p>function: {num}</p>
      <button onMouseEnter={increse}>increase by functional based componant</button>
    </div>
  );
}

export default CounterFunctional;
