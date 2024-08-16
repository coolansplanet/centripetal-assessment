const generateTableAlt = (width, height) => {
  class Box {
    constructor(initial = 0) {
      this.initial = initial;
      this.predecessor = [];
    }
    addPredecessor(aBox) {
      this.predecessor.push(aBox);
    }
    getNumberOfPaths() {
      return (
        this.initial +
        this.predecessor.reduce((total, current) => {
          return total + current.getNumberOfPaths();
        }, 0)
      );
    }
  }
  const rows = [];

  while (rows.length < height || rows[rows.length - 1].length < width) {
    (!rows.length || rows[rows.length - 1].length === width) && rows.push([]);

    const currentRow = rows[rows.length - 1];
    const previousRow = rows[rows.length - 2];
    const leftBox = currentRow[currentRow.length - 1];
    const upperBox = previousRow && previousRow[currentRow.length];

    const box = new Box(!leftBox && !upperBox ? 1 : 0);
    leftBox && box.addPredecessor(leftBox);
    upperBox && box.addPredecessor(upperBox);

    rows[rows.length - 1].push(box);
  }

  return rows;
};

export default generateTableAlt;
