import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';
import { stylable } from 'wix-react-tools';

import stylableStyles from './layout-selector.st.css';
import style from './layout-selector.scss';

const LayoutSelector = stylable(stylableStyles)(class LayoutSelector extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    layoutsOrder: PropTypes.object.isRequired,
  };

  layouts = [
    { layoutId: 0, name: 'Grid' },
    { layoutId: 1, name: 'Masonry' },
    { layoutId: 2, name: 'Collage' },
    { layoutId: 3, name: 'Thumbnails' },
    { layoutId: 4, name: 'Slideshow' },
    { layoutId: 5, name: 'Panorama' },
    { layoutId: 6, name: 'Columns' },
    { layoutId: 7, name: 'Slides' },
  ];

  sidebarToOriginalLayoutMapper = sidebarLayoutId => {
    const { sidebar, original } = this.props.layoutsOrder;
    const sidebarLayoutName = sidebar[sidebarLayoutId];
    const originalLayoutId = original.indexOf(sidebarLayoutName);
    return originalLayoutId;
  }

  originalToSidebarLayoutMapper = originalLayoutId => {
    const { sidebar, original } = this.props.layoutsOrder;
    const originalLayoutName = original[originalLayoutId];
    const sidebarLayoutId = sidebar.indexOf(originalLayoutName);
    return sidebarLayoutId;
  }

  dataMapper = ({ layoutId, name }) => ({ value: layoutId, label: name });

  renderOption = ({ layoutId }, { label }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={layoutId} selected={selected} focused={focused}>
      <div>
        <div className={style[selected ? `${label.toLowerCase()}_selected` : label.toLowerCase()]} />
        <div>{label}</div>
      </div>
    </SelectionListOption>
  );

  onLayoutChange = ({ value }) => {
    const originalLayoutId = this.sidebarToOriginalLayoutMapper(value);
    this.props.onChange({ value: originalLayoutId });
  }


  render() {
    const { value } = this.props;
    return (
      <SelectionList
        dataSource={this.layouts}
        dataMapper={this.dataMapper}
        renderItem={this.renderOption}
        value={this.originalToSidebarLayoutMapper(value)}
        onChange={this.onLayoutChange}
      />
    );
  }
});

export default LayoutSelector;
