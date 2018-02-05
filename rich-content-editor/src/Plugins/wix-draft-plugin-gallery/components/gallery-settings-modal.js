import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';

import { ThemeProvider } from '~/Components/ThemeProvider';
import LayoutSelector from './gallery-controls/layouts-selector';

import Styles from './gallery-settings-modal.scss';

import GallerySettingsFooter from './gallery-controls/gallery-settings-footer';
import LayoutControlsSection from './layout-controls-section';
import SettingsSection from '~/Components/SettingsSection';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import layoutData from '../layout-data-provider';
import Themable from '~/Components/Themable';

import GallerySettingsMobileHeader from './gallery-controls/gallery-settings-mobile-header';

class ManageMediaSection extends Component {
  applyItems = items => {
    const { data, store } = this.props;
    const componentData = { ...data, items };
    store.set('componentData', componentData);
  };

  handleFileChange = (event, itemPos) => {
    if (event.target.files.length > 0) {
      const handleFilesSelected = this.props.store.get('handleFilesSelected');
      handleFilesSelected(event.target.files, itemPos);
    }
    event.target.value = ''; //reset the input
  };

  render() {
    return (
      <div>
        <SortableComponent
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          isMobile={this.props.isMobile}
        />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = {
      ...data,
      styles: Object.assign({}, data.styles, setting)
    };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    const layoutStyles = Object.assign(
      {},
      layout,
      layoutData[layout.galleryLayout]
    );
    this.applyGallerySetting(layoutStyles);
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  layoutsOrder = {
    sidebar: [
      'grid',
      'masonry',
      'collage',
      'thumbnails',
      'slideshow',
      'panorama',
      'columns',
      'slides'
    ],
    original: [
      'collage',
      'masonry',
      'grid',
      'thumbnails',
      'slides',
      'slideshow',
      'panorama',
      'columns'
    ]
  };

  render() {
    const { data, store, isMobile } = this.props;
    return (
      <div>
        <SettingsSection>
          <LayoutSelector
            value={this.getValueFromComponentStyles('galleryLayout')}
            onChange={event =>
              this.switchLayout({ galleryLayout: event.value })
            }
            layoutsOrder={this.layoutsOrder}
            isMobile={isMobile}
            />
        </SettingsSection>
        <LayoutControlsSection
          layout={this.getValueFromComponentStyles('galleryLayout')}
          layoutsOrder={this.layoutsOrder}
          data={data}
          store={store}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};

export class GallerySettingsModal extends Themable {
  state = { initComponentData: null };

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({
      initComponentData: this.props.pubsub.get('componentData')
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    if (this.state.initComponentData) {
      pubsub.set('componentData', this.state.initComponentData);
    }

    helpers.closeExternalModal();
  };

  getDefaultStyles() {
    return Styles;
  }

  getTheme() {
    return this.props.theme;
  }

  renderDesktop(styles) {
    const { activeTab, pubsub, helpers, isMobile } = this.props;
    const componentData = pubsub.get('componentData');
    // console.log('MODAL_RENDER: ', componentData);

    if (isMobile) {
      // console.log('Rendering mobile settings');
      return (
        <ThemeProvider theme={'rce'}>
          <GallerySettingsMobileHeader
            cancel={() => this.revertComponentData()}
            save={() => helpers.closeExternalModal()}
          />
          <ManageMediaSection data={componentData} store={pubsub.store} isMobile />
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={'rce'}>
          <h3 className={styles.title}>Gallery Settings</h3>
          <div className={styles.gallerySettings}>
            <Tabs value={activeTab}>
              <Tab label={'Organize Media'} value={'manage_media'}>
                <ManageMediaSection data={componentData} store={pubsub.store} isMobile={false} />
              </Tab>
              <Tab label={'Advanced Settings'} value={'advanced_settings'}>
                <AdvancedSettingsSection
                  data={componentData}
                  store={pubsub.store}
                />
              </Tab>
            </Tabs>
          </div>
          <GallerySettingsFooter
            cancel={() => this.revertComponentData()}
            save={() => helpers.closeExternalModal()}
          />
        </ThemeProvider>
      );
    }
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool
};

export default GallerySettingsModal;
