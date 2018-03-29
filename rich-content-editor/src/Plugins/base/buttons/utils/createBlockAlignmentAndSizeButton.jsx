import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ToolbarButton from '~/Components/ToolbarButton';

export default ({ alignment, size, Icon, tooltipTextKey }) =>
  class BlockAlignmentAndSizeButton extends Component {
    static propTypes = {
      setAlignmentAndSize: PropTypes.func.isRequired,
      alignment: PropTypes.string,
      size: PropTypes.string,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
    };

    isActive = () => this.props.alignment === alignment && this.props.size === size;

    handleClick = () => this.props.setAlignmentAndSize(alignment, size);

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { theme, isMobile, t } = this.props;
      const className = this.isActive() ? classNames(theme.button, theme.active) : theme.button;
      const tooltipText = t(tooltipTextKey);
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `blockAlignmentAndSizeButton_${textForHooks}`;

      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button className={className} data-hook={dataHookText} onClick={this.handleClick}>
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );

      return <ToolbarButton theme={theme} showTooltip={showTooltip} tooltipText={tooltipText} button={blockButton} />;
    }
  };
