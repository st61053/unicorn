import { useState, useEffect } from "react";
import "./App.css";
import ListItem from "./components/list/ListItem";
import Error from "./components/Error";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [option, setOption] = useState("#967BDC");

  const colors = [
    "#967BDC",
    "#36BC9B",
    "#F8BA43",
    "#4B89DC",
    "#D94555",
    "#D96FAD",
  ];

  function handleAddItem() {
    if (inputValue?.length > 3) {
      items.push({ text: inputValue, color: option, completed: false });
      document.getElementById("input").value = "";
      setItems([...items]);
    }
  }

  function setSelectValue(event) {
    setOption(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const json = await response.json();
      //console.log(json[0].title)

      if (response.ok) {
        const updated = json.map((item) => ({ ...item, color: colors[Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0] }));
        setItems(updated);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Poznámky</h1>

      {inputValue?.length < 3 && <Error />}

      <div className="list">
        {items &&
          items.map((item, index) => (
            <ListItem
              item={item}
              key={index}
              index={index}
              onCompletedClick={(id) => {
                item.completed = !item.completed;
                setItems([...items]);
              }}
            />
          ))}
      </div>

      <div className="controll-bar">
        <input
          type="text"
          id="input"
          onChange={(e) => setInputValue(e.target.value)}
        />

        <select name="color" id="select-color" onChange={setSelectValue}>
          <option value="#967BDC">fialová</option>
          <option value="#36BC9B">zelená</option>
          <option value="#F8BA43">žlutá</option>
          <option value="#4B89DC">modrá</option>
          <option value="#D94555">červená</option>
          <option value="#D96FAD">růžová</option>
        </select>

        <button onClick={handleAddItem}>Vlož</button>
      </div>
    </div>
  );
}

export default App;
