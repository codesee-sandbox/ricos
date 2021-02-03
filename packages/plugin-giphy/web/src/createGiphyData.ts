import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE } from 'wix-rich-content-common';
import { Node_Type } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = convertNodeDataToDraft(Node_Type.GIPHY, pluginData);
  return merge({}, currentData || DEFAULTS, giphyData);
};
