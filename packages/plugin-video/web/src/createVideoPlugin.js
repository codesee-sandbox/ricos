import createToolbar from './toolbar';
import { Component } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import {
  pluginDecorationProps,
  componentWillReceiveDecorationProps,
} from 'wix-rich-content-editor';

const createVideoPlugin = (config = {}) => {
  const type = VIDEO_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    pluginDecorationProps,
    componentWillReceiveDecorationProps,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    ...rest,
  });
};

export { createVideoPlugin };
