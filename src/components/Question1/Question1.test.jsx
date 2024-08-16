import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import Question1 from "./Question1";

describe("Unit test for <Question1/> component", () => {
  const testTable = ({
    expectedNumbers = [],
    table,
    highlightedCellNumber = 0,
    expectedHeight = 0,
    expectedCellsAmount = 0,
  }) => {
    const rows = table.querySelectorAll("tr");
    const cells = table.querySelectorAll("td");
    expect(rows).length(expectedHeight);
    expect(cells).length(expectedCellsAmount);
    const tableCells = table.querySelectorAll("td");
    expectedNumbers.forEach((expectedNumber, index) => {
      const selectedBoxClass = "table__cell table__cell--selected";

      expect(tableCells[index].querySelector("p").innerHTML).toMatch(
        expectedNumber
      );
      if (index === highlightedCellNumber) {
        expect(tableCells[index]).toHaveClass(selectedBoxClass);
      } else {
        expect(tableCells[index]).not.toHaveClass(selectedBoxClass);
      }
    });
  };
  test("Tables work properly", () => {
    const { getByLabelText, getByTestId } = render(<Question1 />);

    const widthInput = getByLabelText(/width/i);
    const heightInput = getByLabelText(/height/i);

    const table1 = getByTestId("table-first-approach");
    const table2 = getByTestId("table-second-approach");

    expect(widthInput.value).toMatch(3);
    expect(heightInput.value).toMatch(3);

    expect(table1).toBeInTheDocument();
    expect(table2).toBeInTheDocument();

    const expectedNumbers = [1, 1, 1, 1, 2, 3, 1, 3, 6];

    testTable({
      expectedNumbers,
      table: table1,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    testTable({
      expectedNumbers,
      table: table2,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    fireEvent.change(widthInput, { target: { value: 4 } });

    const expectedNumbers2 = [1, 1, 1, 1, 1, 2, 3, 4, 1, 3, 6, 10];

    testTable({
      expectedNumbers2,
      table: table1,
      highlightedCellNumber: 11,
      expectedHeight: 3,
      expectedCellsAmount: 12,
    });

    testTable({
      expectedNumbers2,
      table: table2,
      highlightedCellNumber: 11,
      expectedHeight: 3,
      expectedCellsAmount: 12,
    });

    fireEvent.change(heightInput, { target: { value: 4 } });

    const expectedNumbers3 = [
      1, 1, 1, 1, 1, 2, 3, 4, 1, 3, 6, 10, 1, 4, 10, 20,
    ];

    testTable({
      expectedNumbers3,
      table: table1,
      highlightedCellNumber: 15,
      expectedHeight: 4,
      expectedCellsAmount: 16,
    });

    testTable({
      expectedNumbers3,
      table: table2,
      highlightedCellNumber: 15,
      expectedHeight: 4,
      expectedCellsAmount: 16,
    });

    fireEvent.change(heightInput, { target: { value: 2 } });
    fireEvent.change(widthInput, { target: { value: 2 } });

    const expectedNumbers4 = [1, 1, 1, 2];

    testTable({
      expectedNumbers4,
      table: table1,
      highlightedCellNumber: 3,
      expectedHeight: 2,
      expectedCellsAmount: 4,
    });

    testTable({
      expectedNumbers4,
      table: table2,
      highlightedCellNumber: 3,
      expectedHeight: 2,
      expectedCellsAmount: 4,
    });

    fireEvent.change(heightInput, { target: { value: 3 } });
    fireEvent.change(widthInput, { target: { value: 3 } });

    testTable({
      expectedNumbers,
      table: table1,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    testTable({
      expectedNumbers,
      table: table2,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    const firstCell = table1.querySelector("td");
    fireEvent.click(firstCell);
    testTable({
      expectedNumbers,
      table: table1,
      highlightedCellNumber: 0,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    fireEvent.change(heightInput, { target: { value: 4 } });
    fireEvent.change(widthInput, { target: { value: 4 } });

    fireEvent.change(heightInput, { target: { value: "p" } });
    fireEvent.change(widthInput, { target: { value: "p" } });

    testTable({
      expectedNumbers,
      table: table1,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });

    testTable({
      expectedNumbers,
      table: table2,
      highlightedCellNumber: 8,
      expectedHeight: 3,
      expectedCellsAmount: 9,
    });
  });
});
