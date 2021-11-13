import { useEffect, useLayoutEffect, useReducer } from "react"
import { countReducer } from "../store"

const init = (initalArg) => initalArg - 0
function AmeHooksPage(props) {
    const [count, setCount] = useReducer(countReducer, '0', init)
    const [count2, setCount2] = useReducer(countReducer, '0', init)
    useEffect(() => {
        console.log("useEffect")  
        return () => {
           console.log("useEffect unmount") 
        } 
    }, [count])

    useLayoutEffect(() => {
        console.log("useLayoutEffect")
        return () => {
            console.log("useLayoutEffect unmount") 
         } 
    }, [count])
    return(
        <div>
            <h3>HooksPage</h3>
            <button onClick={() => setCount({type: 'ADD'})}>{count}</button>
            <button onClick={() => setCount2({type: 'ADD'})}>{count2}</button>
        </div>
    )
}
export default AmeHooksPage