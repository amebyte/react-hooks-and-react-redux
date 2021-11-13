import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function AmeReactReduxHooksPage(props) {
    const count = useSelector(({count}) => count)
    const dispatch = useDispatch()
    const add = useCallback(() => {
        dispatch({type: 'ADD'})        
    }, [])
    return (
        <div>
            AmeReactReduxHooksPage
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    )
}