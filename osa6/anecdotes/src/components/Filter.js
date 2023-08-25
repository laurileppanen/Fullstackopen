import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      const arvo = event.target.value
      dispatch(filterChange(arvo))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        <br/>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter