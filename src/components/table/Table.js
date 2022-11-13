import { useState } from "react";

const Table = (props) => {
  const [filteredData, setFilteredData] = useState(props.data);

  return (
    <div>
      {props.filters &&
        props.filters.map((item) => {
          return (
            <button
              onClick={() => setFilteredData(item.filterFunction(props.data))}
            >
              {item.title}
            </button>
          );
        })}

      <table>
        <tbody>
          {filteredData.map((item) => {
            return (
              <tr key={"tr" + item.id}>
                {props.columns.map((column, index) => {
                  return (
                    <td key={"td-" + item.id + "index" + index}>
                      {(column?.component && column.component(item)) ??
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

export default Table;
