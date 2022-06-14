import {useEffect, useState} from "react"

import "./App.css"

function App() {

  const [turn, setTurn] = useState ("X");
  const [cells, setCells] = useState(["","","","","","","","",""])
  const [status,setStatus] = useState ("");
  
  const COMBS_WINS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const Ganador = () => {
    return (<div className="resultado"><h3>EL GANADOR ES <span>{status}</span></h3><button onClick={handleReset}>RESET</button></div>)
  }

  const Empate = () => {
    if (cells.every(cell => cell !== "")) return (<div className="resultado"><h3>EMPATE</h3><button onClick={handleReset}>RESET</button></div>)
  }


  const handleClick = (index) => {

    if (status.length === 0) {

      const tableInsert = [...cells];

      if (tableInsert[index] === "") {
        tableInsert[index] = turn;
        setCells(tableInsert);
        { turn === "X" ? setTurn("O") : setTurn("X") }
      }
    }
  }


  const handleReset = () => {
    const reset = ["", "", "", "", "", "", "", "", ""];
    setCells(reset);
    setStatus("");
  }

  useEffect(() => { ["X", "O"].forEach(
    (player) => { const gano = COMBS_WINS.some((comp) => comp.every((cell) => player === cells[cell]))
      if (gano) setStatus(player)});
  },[cells])


  return (
    <div className="appContainer">
      <div className="table">
        {cells.map((item,index) => <div key={index} className="cells" onClick={()=>handleClick(index)}>{item}</div>)}
      </div>
        {status.length > 0 ? <Ganador></Ganador> : (<Empate></Empate> || <h3>ta te ti</h3>)}
    </div>
    );
}

export default App;
