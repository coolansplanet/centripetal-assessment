import { useState, useEffect } from "react";
import "./Table.css";

const Table = ({
  data = [],
  getFn,
  "data-testid": dataTestId = "table-container",
}) => {
  const [selectedBox, setSelectedBox] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedBox({ x: data[data.length - 1].length - 1, y: data.length - 1 });
  }, [data]);

  const selectedNumber =
    data[selectedBox.y] && data[selectedBox.y][selectedBox.x];
  return (
    <div className="table__container" data-testid={dataTestId}>
      <h3 className="table__title">
        Paths:{" "}
        {!getFn ? selectedNumber : selectedNumber ? getFn(selectedNumber) : 0}
      </h3>
      <table>
        <tbody>
          {data.map((oneRow, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {oneRow.map((oneCell, cellIndex) => {
                  /*
                  Note from Herman:
                  
                    Yep, I now this is quadratic,
                    but I think it's ok when the
                    expected amount of data to handle
                    is relatively low. In this case is just 
                    for displaying a table on the screen
                */
                  return (
                    <td
                      className={`table__cell${
                        selectedBox?.x === cellIndex &&
                        selectedBox?.y === rowIndex
                          ? " table__cell--selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedBox({ x: cellIndex, y: rowIndex })
                      }
                      key={cellIndex}
                    >
                      <p className="table__cell-content">
                        {getFn ? getFn(oneCell) : oneCell}
                      </p>
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
