import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Poll } from './Poll';
import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';

export class PollEditor extends PureComponent {
  setPoll = poll => {
    const { componentData, store } = this.props;

    store.set(
      'componentData',
      {
        ...componentData,
        poll,
      },
      this.props.block.getKey()
    );
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  render() {
    const {
      setInPluginEditingMode,
      componentData,
      settings,
      helpers,
      t,
      theme,
      isMobile,
    } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{
          isViewMode: settings.isWebView || !this.isPluginFocused(),
          setInPluginEditingMode,
          layout: componentData.layout,
          design: componentData.design,
          helpers,
          theme,
          t,
          isMobile,
          ...settings,
        }}
      >
        <PollContextProvider
          settings={settings}
          poll={componentData.poll}
          setPoll={this.setPoll}
          t={t}
        >
          <Poll />
        </PollContextProvider>
      </RCEHelpersContext.Provider>
    );
  }
}

PollEditor.propTypes = {
  componentData: PropTypes.shape({
    poll: PropTypes.object,
    pollId: PropTypes.string,
    layout: PropTypes.object,
    design: PropTypes.object,
  }).isRequired,

  block: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,

  setInPluginEditingMode: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    siteToken: PropTypes.string,
    isWebView: PropTypes.bool,
    getSiteMembers: PropTypes.func,
  }),
  helpers: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  commonPubsub: PropTypes.object,
  store: PropTypes.shape({
    set: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }).isRequired,
};
