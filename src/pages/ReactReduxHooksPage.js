// import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {useDispatch, useSelector} from "../kReactRedux";

function ReactReduxHooksPage(props) {
  const dispatch = useDispatch();
  const add = React.useCallback(() => {
    dispatch({type: "ADD"});
  }, []);
  const count = useSelector(({count}) => count);
  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}
export default ReactReduxHooksPage;
