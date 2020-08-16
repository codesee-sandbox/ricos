import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setColListeners, setRowListeners } from '../table-resize';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';

export default class Cell extends PureComponent {
  render() {
    const {
      cell,
      row,
      col,
      className,
      style,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      onContextMenu,
      children,
      attributesRenderer,
    } = this.props;

    const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};
    const { style: additionalStyles, merge } = attributes.cellData || {};
    const {
      table = {},
      onResize: { onResizeCol, onResizeRow },
    } = attributes || {};
    const { offsetHeight, offsetWidth } = table;
    const { colSpan = 1, rowSpan = 1, child } = merge || {};
    return child ? null : (
      //eslint-disable-next-line
      <td
        className={classNames(className, styles.container)}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{ ...style, ...(additionalStyles || {}) }}
        data-row={row}
        data-col={col}
      >
        {children}
        {row === 0 && (
          <div
            className={styles.colResizer}
            style={{ height: offsetHeight }}
            ref={ref => ref && setColListeners(ref, onResizeCol)}
          />
        )}
        {col === 0 && (
          <div
            className={styles.rowResizer}
            style={{ width: offsetWidth }}
            ref={ref => ref && setRowListeners(ref, onResizeRow)}
          />
        )}
      </td>
    );
  }
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  cell: PropTypes.object,
  children: PropTypes.any,
};
