import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/rows.scss';
import DragAndDropSection from './DragAndDropSection';
import Resizer from './Resizer';
import SelectTable from './SelectTable';
import { ROW_DEFAULT_HEIGHT } from '../consts';
export default class Rows extends PureComponent {
  constructor(props) {
    super(props);
    this.rows = [props.rowNum];
  }
  setContainerSize = (size, index) => (this.rows[index].style.height = size);

  render() {
    const {
      rowDragProps,
      activeDrag,
      size,
      onResize,
      highlightResizer,
      onResizeStart,
      isEditMode,
      isSelectAllActive,
      onSelectAllClick,
      rowNum,
      rowsHeights,
      isAllCellsSelected,
      rowsRefs,
    } = this.props;
    return (
      <div style={{ display: isEditMode ? 'flex' : 'none' }} className={styles.container}>
        <div className={styles.selectAllContainer}>
          <SelectTable isActive={isSelectAllActive} onClick={onSelectAllClick} />
          {[...Array(rowNum).fill(0)].map((row, index) => (
            <div
              ref={ref => (this.rows[index] = ref)}
              key={index}
              className={styles.rowContainer}
              style={{ height: rowsHeights[index] }}
            >
              <DragAndDropSection
                {...rowDragProps}
                index={index}
                activeDrag={activeDrag}
                selectAll={isAllCellsSelected}
                size={size}
              />
              <Resizer
                index={index}
                highlightResizer={highlightResizer}
                onResize={onResize}
                size={size + 20}
                key={'resizer'}
                onResizeStart={onResizeStart}
                itemsRefs={rowsRefs}
                setContainerSize={this.setContainerSize}
                minSize={ROW_DEFAULT_HEIGHT}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Rows.propTypes = {
  rowDragProps: PropTypes.object.isRequired,
  size: PropTypes.number,
  activeDrag: PropTypes.array,
  selectAll: PropTypes.bool,
  onResize: PropTypes.func,
  highlightResizer: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onResizeStart: PropTypes.func,
  isEditMode: PropTypes.bool,
  isSelectAllActive: PropTypes.bool,
  onSelectAllClick: PropTypes.func,
  rowNum: PropTypes.number,
  rowsHeights: PropTypes.array,
  isAllCellsSelected: PropTypes.bool,
  rowsRefs: PropTypes.array,
};