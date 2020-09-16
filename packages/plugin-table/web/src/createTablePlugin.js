import createToolbar from './toolbar/createToolbar';
import { Component } from './table-component';
import { getDefaultsSettings } from './defaults';
import { TABLE_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { COMMANDS } from 'wix-rich-content-editor-common';
import CodeUtils from 'draft-js-code';

const createTablePlugin = (config = {}) => {
  const { helpers, t, [TABLE_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin(
    {
      component: Component,
      type: TABLE_TYPE,
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
      defaultPluginData: getDefaultsSettings(),
      ...rest,
    },
    {
      handleKeyCommand: (command, editorState, timestamp, { setEditorState }) => {
        if (CodeUtils.hasSelectionInBlock(editorState)) {
          let newState;
          if (command === COMMANDS.TAB) {
            const mockEvent = { preventDefault: () => {} };
            newState = CodeUtils.onTab(mockEvent, editorState);
          }
          if (newState) {
            setEditorState(newState);
            return 'handled';
          }
        }
        return 'not-handled';
      },
    }
  );
};

export { createTablePlugin };
