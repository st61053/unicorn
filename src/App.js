import "./App.css";
import MyTable from "./components/table/MyTable";
import { useState, useEffect } from "react";
import 'rsuite/dist/rsuite.min.css';

import { Routes, Route, Link, useParams } from "react-router-dom";
import Item from "./components/Item";
import EditForm from "./components/EditForm";

import { Table } from "rsuite";

function ItemDetailManagement() {
  let { id } = useParams();
  return (
    <>
      <Item id={id} />
      <Link to={`/edit/${id}`}>Edit</Link>
      <Link to={"/"}>Zpět na přehled</Link>
    </>
  );
}

function ItemEditManagement() {
  let { id } = useParams();
  return (
    <>
      <EditForm id={id} />
      <Link to={`/item/${id}`}>Zpět na item</Link>
    </>
  );
}

function App() {
  const [data, setData] = useState([]);
  const { Column, HeaderCell, Cell } = Table;

  const fetchData = async () => {
    const response = await fetch("http://localhost:3004/todos");
    const json = await response.json();

    if (response.ok) {
      setData(json);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------ COLUMNS ------------------

  const columns = [
    {
      attribute: "id",
      component: (item, customFunction) => (
        <input
          type="checkbox"
          onChange={async () => {
            await completeItem(item.id);
            customFunction.reloadData();
          }}
          checked={item.completed ? "checked" : ""}
          style={{
            width: "1.3em",
            height: "1.3em",
            backgroundColor: item.completed ? "black" : "white",
            borderRadius: "50%",
            padding: "3px",
            verticalAlign: "middle",
            border: "1px solid black",
            backgroundClip: "content-box",
            appearance: "none",
            outline: "none",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      attribute: "id",
    },
    {
      attribute: "title",
      component: (item) => (
        <Link
          to={`/item/${item.id}`}
          style={{
            color: item.completed ? "#D3D3D3" : "black",
            textDecoration: item.completed ? "line-through" : "none",
          }}
        >
          {item.title}
        </Link>
      ),
    },
    {
      attribute: "id",
      component: (item, customFunction) => (
        <span
          className="material-symbols-outlined close"
          style={{ cursor: "pointer", color: "red" }}
          onClick={async () => {
            await deleteItem(item.id);
            customFunction();
          }}
        >
          close
        </span>
      ),
    },
  ];

  // ------------ FUNCTIONS FOR COMPONENTS ------------------

  function deleteItem(id) {
    return fetch(`http://localhost:3004/todos/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  }

  async function completeItem(id) {
    await fetch(`http://localhost:3004/todos/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        const updateItem = {
          completed: !response.completed,
        };

        await fetch(`http://localhost:3004/todos/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(updateItem),
        });
      });
  }

  // ------------ FILTERS ------------------

  const todosFilters = [
    {
      title: "All",
      filterFunction: (data) => data,
    },
    {
      title: "Active",
      filterFunction: (data) => data.filter((item) => !item.completed),
    },
    {
      title: "Complete",
      filterFunction: (data) => data.filter((item) => item.completed),
    },
  ];

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MyTable
              baseUri={"http://localhost:3004"}
              object={"todos"}
              columns={columns}
              filters={todosFilters}
              limit={10}
              title={"Todos"}
            />
          }
        />
        <Route exact path="/item/:id" element={<ItemDetailManagement />} />
        <Route exact path="/edit/:id" element={<ItemEditManagement />} />
        <Route
          exact
          path="/rsuite"
          element={
            <Table data={data} height={700} rowKey="id">
              <Column width={60} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>
              <Column width={150}>
                <HeaderCell>Title</HeaderCell>
                <Cell dataKey="title" />
              </Column>
            </Table>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
