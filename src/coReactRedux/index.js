import React, { useContext, useEffect, useState, useReducer } from 'react'
// 主要是利用了context跨层级数据传递
// 1.创建context对象
const Context = React.createContext()
// 2.Provider传递value
export function Provider({children, store}) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

// 3.子孙组件消费store
export const connect = (mapStateToProps, mapDispatchToProps) =>(WrappedComponent) => (props) => {
    const store = useContext(Context)
    const stateProps = mapStateToProps(store.getState())
    const dispatchProps = {dispatch: store.dispatch}
    const [forceUpdate] = useState(0)
    // const [count, forceUpdate] = useReducer(p => p + 1, 0)
    useEffect(() => {
        store.subscribe(() => {
            forceUpdate((prev) => prev + 1)
            // forceUpdate()
        })
    }, [store])
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps}/>
}

export function bindActionCreators(creators, dispatch) {
    let obj = {}
    for(let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }
    return obj
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}