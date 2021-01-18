import {
  PluginTypeMapper,
  CreatePluginFunction,
  ModalsMap,
  ViewerPlugin,
  EditorPlugin,
  InlineStyleMapper,
  CreatePluginsDataMap,
} from 'wix-rich-content-common';

export type BasePlugin = EditorPlugin & ViewerPlugin;

export interface EditorPluginsStrategy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
  plugins: CreatePluginFunction[];
  ModalsMap: ModalsMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPluginsDataMap?: CreatePluginsDataMap;
}

export interface ViewerPluginsStrategy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
  typeMappers: PluginTypeMapper[];
  inlineStyleMappers: (() => InlineStyleMapper)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: any[];
}

export interface PluginsStrategy extends EditorPluginsStrategy, ViewerPluginsStrategy {}
