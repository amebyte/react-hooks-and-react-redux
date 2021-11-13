import React, {Component} from "react";
import store from "../store/";
import {connect} from 'react-redux'

@connect(
    // mapStateToProps
    (state) => ({count: state.count})
)
class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  add = () => {
    console.log('this.props', this.props)
    // 修改状态 set
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    // ajax
    // setTimeout(() => {
    //   store.dispatch({type: "ADD", payload: 1});
    // }, 1000);

    store.dispatch((dispatch, getState) => {
      console.log('pre-state', getState())
      setTimeout(() => {
        // console.log("now ", getState()); //sy-log
        dispatch({type: "ADD", payload: 1});
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100,
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
      </div>
    );
  }
}

export default ReduxPage