// @flow
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../consts';
import { InsertPluginIcon } from '../icons';

const createInsertButtons /*: CreateInsertButtons */ = ({ helpers, t, settings }) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.FILE,
      multi: true,
      name: 'ImagePlugin_InsertButton',
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
    },
  ];
};

export default createInsertButtons;
