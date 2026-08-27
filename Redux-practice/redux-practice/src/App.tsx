import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./app/store";

import {
  increment,
  decrement,
  reset,
} from "./features/counter/counterSlice";

function App() {
  const count = useSelector(
    (state: RootState) => state.counter.count
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default App;