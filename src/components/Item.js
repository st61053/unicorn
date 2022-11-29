import { useEffect, useState } from "react";


const Item = (props) => {

  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3004/todos/${props.id}`)
    if (!response.ok) {
      throw new Error('Data could not be fetched')
    }
    setData(await response.json());
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Item detail</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Item;
