import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class InSpoilerInput extends Component {
  constructor(props) {
    super(props);
    this.state = { maxHeight: props.isMobile ? 58 : 40 };
  }
  componentDidMount() {
    this.updateHeightOfTextArea();
  }

  componentDidUpdate() {
    this.updateHeightOfTextArea();
  }

  updateHeightOfTextArea = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const element = this.textAreaElement || findDOMNode(this);
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
    this.textAreaElement = element;
  };

  handleFocus = () => {
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => this.props.setInPluginEditingMode(false);

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = e => {
    const { maxHeight } = this.state;
    const oldValue = this.props.value;
    this.props.onChange?.(e.target.value);
    if (e.target.scrollHeight > maxHeight) {
      this.props.onChange?.(oldValue);
    }
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  render() {
    const { className, disabled, value, isMobile } = this.props;

    return (
      <textarea
        rows="1"
        dir="auto"
        disabled={disabled}
        className={className}
        value={value}
        onChange={this.onChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        maxLength="100"
        onKeyPress={this.handleKeyPress}
        style={{ 'margin-top': isMobile ? '12px' : '20px' }}
      />
    );
  }
}

InSpoilerInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  disabled: PropTypes.bool,
  isMobile: PropTypes.bool,
};

InSpoilerInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};

export default InSpoilerInput;
