const generateTable = (width, height) => {
  let x = 0;
  const rows = [];

  while (rows.length < height || x < width) {
    x = x % width;
    !x && rows.push([]);

    const y = rows.length - 1;
    const pathsToLeftBox = rows[y][x - 1] || 0;
    const pathsToUpperBox = rows[y - 1] ? rows[y - 1][x] : 0;
    rows[y].push(pathsToLeftBox + pathsToUpperBox || 1);
    x++;
  }

  return rows;
};

export default generateTable;
