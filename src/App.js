import ReduxPage from "./pages/AmeReduxPage";
// import AmeReactReduxHooksPage from "./pages/AmeReactReduxHooksPage";
import { useState } from "react";
// import AmeHooksPage from "./pages/AmeHooksPage";

export default function App(props) {
  const [state, setState] = useState(1)
  return (
    <div>
      {/* <button onClick={() => setState(state + 1)}>{state}</button>
      {state % 2 && <AmeHooksPage />} */}
      <ReduxPage title="coboy" count={state} />
    </div>
  );
}
