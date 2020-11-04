import { EditorState } from 'wix-rich-content-editor';

//CREATE EMPTY TABLE COMPS
export const createEmptyCellEditor = () => EditorState.createEmpty();

export const createEmptyCell = () => ({ content: createEmptyCellEditor() });

export const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
  columnsIndexes.forEach(i => (emptyRow.columns[i] = createEmptyCell()));
  return emptyRow;
};

//RESIZERS
const getStyleVal = (elm, css) => {
  return window.getComputedStyle(elm, null).getPropertyValue(css);
};

export const paddingDiff = col => {
  if (getStyleVal(col, 'box-sizing') === 'border-box') {
    return 0;
  }
  const padLeft = getStyleVal(col, 'padding-left');
  const padRight = getStyleVal(col, 'padding-right');
  return parseInt(padLeft) + parseInt(padRight);
};

//SELECTION
export const getCellBorderStyle = (selection, row, col, borderStyle) => {
  const style = {};
  const range = getRange(selection);
  if (!range.find(({ i, j }) => i === row && j === col - 1)) {
    style.borderLeft = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row && j === col + 1)) {
    style.borderRight = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row - 1 && j === col)) {
    style.borderTop = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row + 1 && j === col)) {
    style.borderBottom = borderStyle;
  }
  return style;
};

export const range = (start, end) => {
  const array = [];
  const inc = end - start > 0;
  for (let i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
    inc ? array.push(i) : array.unshift(i);
  }
  return array;
};

export const getRange = ({ start, end }) => {
  const ranges = [];
  start &&
    end &&
    range(start.i, end.i).map(i => range(start.j, end.j).map(j => ranges.push({ i, j })));
  return ranges;
};

export const getColsRange = ({ start, end }) => {
  const ranges = [];
  range(start.j, end.j).map(j => ranges.push(j));
  return ranges;
};

export class TableDataUtil {
  constructor(componentData) {
    this.updateComponentData(componentData);
  }

  updateComponentData = componentData => {
    this.componentData = componentData;
    this.rows = this.componentData.config.rows;
  };

  //TABLE DATA GETTERS
  getRowColumns = i => this.getRow(i)?.columns;

  getRows = () => this.componentData?.config?.rows;

  getRow = i => this.getRows()?.[i];

  getRowNum = () => Object.entries(this.getRows()).length;

  getColNum = () => Object.entries(this.getRowColumns(0)).length;

  getCell = (i, j) => this.getRow(i) && this.getRowColumns(i)[j];

  getCellContent = (i, j) => this.getCell(i, j)?.content;

  getCellStyle = (i, j) => this.getCell(i, j)?.style;

  getColsWidth = () => this.componentData.config.colsWidth;

  getRowsHeight = () => this.componentData.config.rowsHeight;

  getColWidth = j => this.getColsWidth()[j];

  getRowHeight = i => this.getRowsHeight()[i];

  //SELECTION
  getRowsSelection = rowsIndexes => ({
    start: { i: rowsIndexes.start, j: 0 },
    end: { i: rowsIndexes.end, j: this.getColNum() - 1 },
  });

  getColsSelection = colsIndexes => ({
    start: { i: 0, j: colsIndexes.start },
    end: { i: this.getRowNum() - 1, j: colsIndexes.end },
  });

  getAllCellsSelection = () => ({
    start: { i: 0, j: 0 },
    end: {
      i: this.getRowNum() - 1,
      j: this.getColNum() - 1,
    },
  });

  isAllCellsSelected = (start, end) =>
    start &&
    end &&
    Math.min(start.i, end.i) === 0 &&
    Math.min(start.j, end.j) === 0 &&
    Math.max(start.i, end.i) === this.getRowNum() - 1 &&
    Math.max(start.j, end.j) === this.getColNum() - 1;

  getSelectionStyle = (selection, defaultBG, defaultBorder) => {
    const range = getRange(selection);
    let selectionBGColor = this.getCellStyle(range[0].i, range[0].j)?.backgroundColor || defaultBG;
    let selectionBorderColor = this.getCellBorderColor(
      selection,
      range[0].i,
      range[0].j,
      defaultBorder
    );
    range.forEach(({ i, j }) => {
      const currentCellBGColor = this.getCellStyle(i, j)?.backgroundColor || defaultBG;
      if (selectionBGColor !== currentCellBGColor) {
        selectionBGColor = false;
      }
      const currentCellBorderColor = this.getCellBorderColor(selection, i, j, defaultBorder);
      if (selectionBorderColor !== currentCellBorderColor) {
        selectionBorderColor = false;
      }
    });
    return { selectionBGColor, selectionBorderColor };
  };

  getCellBorderColor = (selection, row, col, defaultBorder) => {
    const style = {};
    const range = getRange(selection);
    if (!range.find(({ i, j }) => i === row && j === col - 1)) {
      style.borderLeft = this.getCellStyle(row, col)?.borderLeft;
    }
    if (!range.find(({ i, j }) => i === row && j === col + 1)) {
      style.borderRight = this.getCellStyle(row, col)?.borderRight;
    }
    if (!range.find(({ i, j }) => i === row - 1 && j === col)) {
      style.borderTop = this.getCellStyle(row, col)?.borderTop;
    }
    if (!range.find(({ i, j }) => i === row + 1 && j === col)) {
      style.borderBottom = this.getCellStyle(row, col)?.borderBottom;
    }
    const borderStyles = Object.values(style);
    const isBorderConsistent = borderStyles.every(borderStyle => borderStyle === borderStyles[0]);
    if (isBorderConsistent) {
      const borderColor = borderStyles[0]
        ? this.getColorFromBorderStyle(borderStyles[0])
        : defaultBorder;
      return borderColor;
    } else {
      return false;
    }
  };

  getColorFromBorderStyle = borderStyle => {
    return borderStyle.includes('transparent') ? 'transparent' : `#${borderStyle.split('#')[1]}`;
  };
}
