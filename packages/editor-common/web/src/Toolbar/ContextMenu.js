import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import Styles from './ContextMenu.scss';
import InlineToolbarButton from './InlineToolbarButton.jsx';

class ContextMenu extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    buttonList: PropTypes.array,
    activeItem: PropTypes.func,
    tooltip: PropTypes.string,
    dataHook: PropTypes.string,
    getButtonStyles: PropTypes.func,
    disableState: PropTypes.bool,
    isActive: PropTypes.func,
    isDisabled: PropTypes.func,
    getIcon: PropTypes.func,
  };

  static defaultProps = {
    isActive: () => false,
    isDisabled: () => false,
    getButtonStyles: () => ({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOptions = () => this.setState({ isOpen: !this.state.isOpen });

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick }) => e => {
    onClick(e);
    this.setState({ isOpen: false });
  };

  renderOptions = () => {
    const { buttonList } = this.props;

    return (
      <div className={Styles.moreMenu}>
        {Object.values(buttonList).map((props, i) => {
          const buttonProps = {
            ...this.props,
            shouldRefreshTooltips: () => this.state.isOpen,
            ...props,
            onClick: this.onChange(props),
          };
          return (
            <InlineToolbarButton
              key={i}
              onClick={this.onChange(props)}
              isActive={buttonProps.isActive()}
              theme={{}}
              dataHook={buttonProps.dataHook}
              isMobile={this.props.isMobile}
              buttonContent={buttonProps.text}
              disabled={buttonProps.isDisabled()}
              asGroupButton
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { tooltip, dataHook, getButtonStyles, isMobile, getIcon, tabIndex } = this.props;
    const { isOpen } = this.state;
    return (
      <ClickOutside onClickOutside={this.hideOptions}>
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <div className={Styles.button_group}>
            <InlineToolbarButton
              isActive={false}
              onClick={this.toggleOptions}
              getButtonStyles={getButtonStyles}
              tooltipText={tooltip}
              dataHook={dataHook}
              isMobile={isMobile}
              icon={getIcon()}
              theme={{}}
              tabIndex={tabIndex}
            />
            {isOpen && this.renderOptions()}
          </div>
        </Tooltip>
      </ClickOutside>
    );
  }
}

export default ContextMenu;
