import { createSpoilerPlugin } from './createSpoilerPlugin';
import { SPOILER_TYPE, SpoilerPluginEditorConfig } from './types';
import { EditorPlugin } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginSpoiler: EditorPlugin<SpoilerPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
  };
};
