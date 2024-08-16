import { useState, useRef } from "react";
import Table from "./Table";
import generateTable from "./generateTable";
import generateTableAlt from "./generateTableAlt";
import InputNumber from "./InputNumber";
import "./Question1.css";

const Question1 = () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const memIndex = useRef({});

  const firstTableName = "first-approach";
  const secondTableName = "second-approach";

  const memoize = (name = "", fn, args = []) => {
    /*
     I had to create my own memoization function
     due React.useMemo() isn't working well.
    */
    const key = `${name}-${args.join("&")}`;
    const savedOutput = memIndex.current[key];
    if (savedOutput) {
      return savedOutput;
    }
    const output = fn(...args);
    memIndex.current[key] = output;
    return output;
  };

  const tableData = memoize(
    firstTableName,
    () => generateTable(width, height),
    [width, height]
  );

  const tableWithObjects = memoize(
    secondTableName,
    () => generateTableAlt(width, height),
    [width, height]
  );

  return (
    <div className="question1">
      <h2 className="question1__title">First Question - Two approaches</h2>
      <p className="question1__description question1__description--filled">
        The number of paths for every box is the addition of its two
        predecesors. Taking this in mind, I used two different approaches
        (although both of them have the same result as you'll see).
      </p>
      <div className="question1__size-settings">
        <InputNumber
          value={width}
          setFunction={setWidth}
          label="Width"
          id="width"
        />
        <InputNumber
          value={height}
          setFunction={setHeight}
          label="Height"
          id="height"
        />
      </div>
      <Table data={tableData} data-testid={`table-${firstTableName}`} />
      <p className="question1__description question1__description--with-line">
        <strong>First approach:</strong> calculating the number of paths from
        within a loop, and adding them into a bi-dimensional array.
      </p>
      <Table
        data={tableWithObjects}
        getFn={(aBox) => aBox.getNumberOfPaths()}
        data-testid={`table-${secondTableName}`}
      />
      <p className="question1__description">
        <strong>Second approach:</strong> using a more object oriented solution,
        where every box is an instance of the Box class, and all of them are
        part of a tree data structure where each node (a Box object) knows its
        predecesors. All those instances are located into a bi-dimensional array
        as well. However, unlike the previous approach, this array is not used
        for performing calculations. Instead, they are performed by the boxes
        objects itself.
      </p>
    </div>
  );
};

export default Question1;
