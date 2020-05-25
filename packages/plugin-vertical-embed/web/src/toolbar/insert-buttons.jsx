import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS, contentTypeMap } from '../constants';
import getModalCustomStyles from './ModalCustomStyles';

export default ({ helpers, t, settings, isMobile }) => {
  const icon = InsertPluginIcon;

  const buttonCreator = type => {
    const contentType = contentTypeMap[type];
    return {
      type: BUTTON_TYPES.MODAL,
      name: `${contentType}_InsertButton`,
      tooltipText: t(`${contentType}Plugin_InsertButton_Tooltip`),
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: { ...DEFAULTS, type },
      helpers,
      t,
      section: 'BlockToolbar_Section_Embed_Wix',
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles: getModalCustomStyles(isMobile),
        fullScreen: false,
        isMobile,
      }),
    };
  };

  const { exposeEmbedButtons = [] } = settings;

  return exposeEmbedButtons.map(verticalType => buttonCreator(verticalType));
};
