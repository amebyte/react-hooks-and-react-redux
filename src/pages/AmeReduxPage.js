import React, {Component} from "react";
import store from "../store/";
import {connect} from 'react-redux'
// import { bindActionCreators } from "redux";
import { bindActionCreators } from "../coReactRedux/"

@connect(
    // mapStateToProps
    // (state) => ({count: state.count})
    ({count}) => ({count}),
    // {
    //     add: () => ({ type: 'ADD'})
    // }
    (dispatch) => {
        // const add = () => dispatch({type: 'ADD'})
        // const minus = () => dispatch({type: 'MINUS'})

        let creators = {
            add: () => ({type: 'ADD'}),
            minus: () => ({type: 'MINUS'})
        }
        creators = bindActionCreators(creators, dispatch)
        // return { dispatch, add, minus }
        return { dispatch, ...creators }
    }
)
class ReduxPage extends Component {

  add = () => {
    console.log('this.props', this.props)
    // 修改状态 set
    this.props.dispatch({type: "ADD"});
  };

  render() {
      const {count, add, minus } = this.props
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

export default ReduxPage