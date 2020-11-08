/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import classNames from 'classnames';
import { BGColorIcon, BorderIcon, TrashIcon } from '../../icons';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/table-toolbar.scss';
import { getRange } from '../../tableUtils';
import ClickOutside from 'react-click-outside';
import { ColorPicker } from 'wix-rich-content-plugin-commons';

const DEFAULT_PALETTE = Object.freeze([
  'transparent',
  '#ffffff',
  '#303030',
  '#3a54b4',
  '#bfad80',
  '#dddddd',
]);
const DEFAULT_BG_COLOR = '#ffffff';
const DEFAULT_BORDER_COLOR = '#dddddd';

class CellFormatting extends Component {
  constructor(props) {
    super(props);
    const ColorsFromComponentData = this.getColorsFromComponentData(props.selected);
    this.state = {
      showBgColorPicker: false,
      showBorderColorPicker: false,
      bgUserColors: props?.settings?.getBgUserColors?.() || [],
      borderUserColors: props?.settings?.getBorderUserColors?.() || [],
      ...ColorsFromComponentData,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.selected !== this.props.selected) {
      const ColorsFromComponentData = this.getColorsFromComponentData(nextProps.selected);
      this.setState({ ...ColorsFromComponentData });
    }
  };

  getColorsFromComponentData = selected => {
    const selectionStyle = this.props.table.getSelectionStyle(
      selected,
      DEFAULT_BG_COLOR,
      DEFAULT_BORDER_COLOR
    );
    const bgColor = selectionStyle.selectionBGColor;
    const borderColor = selectionStyle.selectionBorderColor;
    return {
      bgCurrentColor: bgColor,
      borderCurrentColor: borderColor,
    };
  };

  toggleBgColorPicker = e => {
    if (e.target.closest('[data-id=BGColorIcon]')) {
      this.setState({ showBgColorPicker: !this.state.showBgColorPicker });
    }
  };
  closeBgColorPicker = () => this.setState({ showBgColorPicker: false });

  toggleBorderColorPicker = e => {
    if (e.target.closest('[data-id=BorderIcon]')) {
      this.setState({ showBorderColorPicker: !this.state.showBorderColorPicker });
    }
  };
  closeBorderColorPicker = () => this.setState({ showBorderColorPicker: false });

  onBgColorAdded = color => {
    this.props?.settings?.onBgColorAdded?.(color);
    const bgUserColors = this.props?.settings?.getBgUserColors?.() || [
      ...this.state.bgUserColors,
      color,
    ];
    this.setState({ bgUserColors });
  };
  onBorderColorAdded = color => {
    this.props?.settings?.onBorderColorAdded?.(color);
    const borderUserColors = this.props?.settings?.getBorderUserColors?.() || [
      ...this.state.borderUserColors,
      color,
    ];
    this.setState({ borderUserColors });
  };
  onBgChange = color => {
    this.props.table.setCellsStyle({ backgroundColor: color }, getRange(this.props.selected));
    this.setState({ bgCurrentColor: color });
    this.closeBgColorPicker();
  };
  onBorderChange = color => {
    this.props.table.setCellsSelectionBorderStyle(`1px double ${color}`, this.props.selected);
    this.setState({ borderCurrentColor: color });
    this.closeBorderColorPicker();
  };
  onResetBgColor = () => {
    const bgDefaultColors = this.props?.settings?.getBgDefaultColors?.() || DEFAULT_BG_COLOR;
    this.onBgChange(bgDefaultColors);
  };
  onResetBorderColor = () => {
    const borderDefaultColors =
      this.props?.settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR;
    this.onBorderChange(borderDefaultColors);
  };

  extractPalette = colorScheme => {
    if (!colorScheme) {
      return DEFAULT_PALETTE;
    }
    return Object.values(colorScheme)
      .sort((entry1, entry2) => (entry1.index > entry2.index ? 1 : -1))
      .map(entry => entry.color);
  };

  renderColorPicker(color, userColors, onColorAdded, onChange, onResetColor) {
    const { t, isMobile, settings } = this.props;
    const { colorScheme } = settings;
    const palette = this.extractPalette(colorScheme);
    return (
      <ColorPicker
        color={color}
        palette={palette.slice(0, 6)}
        userColors={userColors.slice(0, 12)}
        onColorAdded={onColorAdded}
        theme={this.styles}
        isMobile={isMobile}
        onChange={onChange}
        t={t}
        onResetColor={onResetColor}
      >
        {({
          renderPalette,
          renderUserColors,
          renderAddColorButton,
          renderResetColorButton,
          mergedStyles,
        }) => (
          <div className={mergedStyles.colorPicker_palette}>
            <div className={mergedStyles.colorPicker_buttons_container}>
              {renderPalette()}
              {renderUserColors()}
            </div>
            <hr className={mergedStyles.colorPicker_separator} />
            <div className={mergedStyles.colorPicker_buttons_container}>
              {renderResetColorButton()}
              {renderAddColorButton()}
            </div>
          </div>
        )}
      </ColorPicker>
    );
  }

  setVerticalAlign = value => {
    this.props.table.setCellsStyle({ verticalAlign: value }, getRange(this.props.selected));
  };

  render() {
    const { deleteBlock, isAllCellsSelected } = this.props;
    return (
      <div className={styles.toolbar}>
        <ClickOutside
          className={styles.insertButton}
          onClick={this.toggleBgColorPicker}
          onClickOutside={this.closeBgColorPicker}
        >
          <BGColorIcon data-id={'BGColorIcon'} className={styles.icon} />
          {this.state.showBgColorPicker && (
            <div className={classNames(styles.moreMenu, styles.colorPickerWrapper)}>
              {this.renderColorPicker(
                this.state.bgCurrentColor,
                this.state.bgUserColors,
                this.onBgColorAdded,
                this.onBgChange,
                this.onResetBgColor
              )}
            </div>
          )}
        </ClickOutside>
        <ClickOutside
          className={styles.insertButton}
          onClick={this.toggleBorderColorPicker}
          onClickOutside={this.closeBorderColorPicker}
        >
          <BorderIcon data-id={'BorderIcon'} className={styles.icon} />
          {this.state.showBorderColorPicker && (
            <div className={classNames(styles.moreMenu, styles.colorPickerWrapper)}>
              {this.renderColorPicker(
                this.state.borderCurrentColor,
                this.state.borderUserColors,
                this.onBorderColorAdded,
                this.onBorderChange,
                this.onResetBorderColor
              )}
            </div>
          )}
        </ClickOutside>
        <div style={{ display: 'flex', gap: '7px' }}>
          <div onClick={() => this.setVerticalAlign('top')}>top</div>
          <div onClick={() => this.setVerticalAlign('middle')}>middle</div>
          <div onClick={() => this.setVerticalAlign('bottom')}>bottom</div>
        </div>
        {isAllCellsSelected && <TrashIcon onClick={deleteBlock} />}
      </div>
    );
  }
}

CellFormatting.propTypes = {
  selected: PropTypes.object.isRequired,
  table: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
  deleteBlock: PropTypes.func,
  isAllCellsSelected: PropTypes.bool,
};

export default CellFormatting;