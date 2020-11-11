/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { TABLE_TYPE, TablePluginViewerConfig } from './types';
import { DEFAULTS, theme } from './defaults';
import { ViewerPlugin } from 'wix-rich-content-common';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable: ViewerPlugin<TablePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
