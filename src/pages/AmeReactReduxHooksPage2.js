import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../coReactRedux/'
export default function AmeReactReduxHooksPage2(props) {
    const count = useSelector(({count}) => count)
    const dispatch = useDispatch()
    const handle = useCallback(() => {
        dispatch({type: 'ADD'})
    }, [])
    return (
        <div>
            <h3>AmeReactReduxHooksPage</h3>
            <h4>{count}</h4>
            <button onClick={handle}>add</button>
        </div>
    )
}
