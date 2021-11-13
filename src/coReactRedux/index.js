import React, { useContext, useEffect, useLayoutEffect, useState, useReducer, useCallback } from 'react'
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
    let dispatchProps = {dispatch: store.dispatch}
    
    if(typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(store.dispatch)
    } else if(typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
    }
    
    // const [,forceUpdate] = useState(0)
    // const [count, forceUpdate] = useReducer(p => p + 1, 0)
    const forceUpdate = useForceUpdate()
    useLayoutEffect(() => {
       const unsubscribe = store.subscribe(() => {
            forceUpdate()
            // forceUpdate((prev) => prev + 1)
            // forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps}/>
}

function useForceUpdate() {
    const [,setState] = useState(0)
    const update = useCallback(() => {
        setState(prev => prev + 1)
    }, [])
    return update
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

export function useDispatch() {
    const store = useContext(Context)
    return store.dispatch
}

export function useSelector(selector) {
    const store = useContext(Context)
    const selectedState = selector(store.getState())

    const forceUpdate = useForceUpdate()
    useLayoutEffect(() => {
       const unsubscribe = store.subscribe(() => {
            forceUpdate()
            // forceUpdate((prev) => prev + 1)
            // forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])

    return selectedState
}
