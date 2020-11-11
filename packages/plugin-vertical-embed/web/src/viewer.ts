import { DEFAULTS } from './constants';
import { VERTICAL_EMBED_TYPE, VerticalEmbedPluginViewerConfig } from './types';
import { typeMapper } from './typeMapper';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as verticalEmbedTypeMapper, VERTICAL_EMBED_TYPE };

export const pluginVerticalEmbed: ViewerPlugin<VerticalEmbedPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VERTICAL_EMBED_TYPE,
    typeMapper,
  };
};
