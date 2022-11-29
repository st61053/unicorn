import { useState, useEffect } from "react";

const MyTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch(
      props.baseUri +
        "/" +
        props.object +
        "?_page=" +
        page +
        "&_limit=" +
        props.limit
    );
    const json = await response.json();

    if (response.ok) {
      setData(json);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="table-div">
      <h1>{props.title}</h1>
      <div className="filter-bar">
        {props.filters &&
          props.filters?.map((item, index) => {
            return (
              <button
                key={"btn-" + index}
                onClick={() => setFilteredData(item.filterFunction(data))}
              >
                {item.title}
              </button>
            );
          })}
        <div className="paging">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setPage((curr) => {
                if (curr > 1) {
                  return curr - 1;
                } else {
                  return 1;
                }
              });
            }}
          >
            arrow_back_ios_new
          </span>
          {page}
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setPage((curr) => {
                if (data.length > 0) {
                  return curr + 1;
                } else {
                  return curr;
                }
              });
            }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>

      <table>
        <tbody>
          {filteredData.map((item, index) => {
            return (
              <tr
                key={"tr-" + index}
              >
                {props.columns.map((column, index) => {
                  return (
                    <td key={"td-" + item.id + "index" + index}>
                      {(column?.component &&
                        column.component(item, {reloadData: fetchData})) ??
                        item[column.attribute]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;
