import './App.css'
import {set_debug} from "./library/debuger/debuger.tsx";
import Display from "./script/dataFetch/stockExchange.tsx";

function App() {

    set_debug(true)

  return (
    <>
        <h1>
            My title
        </h1>
        {Display("1234")}
    </>
  )
}

export default App
