import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";

// context 跨层级数据传递
// * 1. 创建一个context对象
const Context = React.createContext();

// *2. Provider传递value
export function Provider({store, children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// *3 子组件要消费value
// consumer
// contextType
// useContext
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const store = useContext(Context);
  const stateProps = mapStateToProps(store.getState());
  let dispatchProps = {dispatch: store.dispatch};
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(store.dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  }
  // const [state, forceUpdate] = useState({});
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

//
function useForceUpdate() {
  // const [state, setState] = useState(0);
  const [, setState] = useReducer((x) => x + 1, 0);

  const update = useCallback(() => {
    // setState((prev) => prev + 1);
    setState();
  }, []);

  return update;
}

function bindActionCreator(creator, dispatch) {
  return (...arg) => dispatch(creator(...arg));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};

  // todo
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }

  return obj;
}

// 自定义hook
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}

export function useSelector(selecor) {
  const store = useContext(Context);
  const selectedState = selecor(store.getState());

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // forceUpdate
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return selectedState;
}
