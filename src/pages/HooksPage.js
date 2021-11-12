import React, {useReducer, useLayoutEffect, useEffect} from "react";
import {countReducer} from "../store";

const init = (initArg) => {
  return initArg - 0;
};

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  // cdm cdu cwum
  // ajax.then(res=>)
  useEffect(() => {
    console.log("useEffect"); //sy-log
    return () => {
      console.log("useEffect unmount"); //sy-log
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
    return () => {
      console.log("useLayoutEffect unmount"); //sy-log
    };
  }, [state]);

  console.log("---"); //sy-log
  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD"})}>add</button>
    </div>
  );
}
