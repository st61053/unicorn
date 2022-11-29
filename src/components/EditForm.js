import { useEffect, useState } from "react";

const EditForm = (props) => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState();

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3004/todos/${props.id}`);
    if (!response.ok) {
      throw new Error("Data could not be fetched");
    }
    setData(await response.json());
  };

  function updateItem() {
    const updateItem = {
      ...data,
      ...formData,
    };

    return fetch(`http://localhost:3004/todos/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(updateItem),
    }).then((response) => response.json());
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const setFormValue = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <h1>Edit item</h1>
      <input
        value={formData?.title}
        name="title"
        type="text"
        onChange={setFormValue}
      />
      <button onClick={() => updateItem()}>Save</button>
    </div>
  );
};

export default EditForm;
