// import { useState } from "react";

const ListItem = (props) => {

// let [counter, setCounter] = useState(0);


 //useEffect(() => {
 //  const interval = setTimeout(
 //    () => {
 //      setCounter((count) => count + 1);
 //    }, 1000
 //  );

 //  return () => {
 //    clearInterval(interval);
 //  }

 //}, [counter]);

  return (
    <div
      className="list-item"
      style={{
        backgroundColor: props.item.completed ? "#D3D3D3" : props.item.color,
        textDecoration: props.item.completed ? "line-through" : "",
      }}
    >
      {props.item.title}
      <span className="material-symbols-outlined close" onClick={props.onCompletedClick}>close</span>
      {/*<button onClick={() => setCounter((prev) => prev + 1)}>{counter}</button>*/}
      {/*counter > 2 && <button onClick={() => setCounter(0)}>reset</button>*/}
    </div>
  );
};

export default ListItem;
