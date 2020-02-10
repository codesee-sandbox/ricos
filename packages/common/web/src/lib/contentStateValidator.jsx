import { validate, getContentStateSchema } from '../Utils/data-schema-validator';
import buttonSchema from '../../statics/schemas/plugin-button.schema.json';
import dividerSchema from '../../statics/schemas/plugin-divider.schema.json';
import gallerySchema from '../../statics/schemas/plugin-gallery.schema.json';
import fileUploadSchema from '../../statics/schemas/plugin-file-upload.schema.json';
import giphySchema from '../../statics/schemas/plugin-giphy.schema.json';
import htmlSchema from '../../statics/schemas/plugin-html.schema.json';
import imageSchema from '../../statics/schemas/plugin-image.schema.json';
import linkSchema from '../../statics/schemas/plugin-link.schema.json';
import anchorSchema from '../../statics/schemas/plugin-anchor.schema.json';
import mapSchema from '../../statics/schemas/plugin-map.schema.json';
import mentionsSchema from '../../statics/schemas/plugin-mentions.schema.json';
import soundCloudSchema from '../../statics/schemas/plugin-sound-cloud.schema.json';
import videoSchema from '../../statics/schemas/plugin-video.schema.json';
import {
  BUTTON_TYPE,
  DIVIDER_TYPE,
  GALLERY_TYPE,
  FILE_UPLOAD_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  LINK_TYPE,
  ANCHOR_TYPE,
  MAP_TYPE,
  MENTION_TYPE,
  SOUND_CLOUD_TYPE,
  VIDEO_TYPE,
} from '../consts';

export const isValidEditorData = payload => {
  const schema = getContentStateSchema({
    [DIVIDER_TYPE]: dividerSchema,
    [IMAGE_TYPE]: imageSchema,
    [VIDEO_TYPE]: videoSchema,
    [GIPHY_TYPE]: giphySchema,
    [FILE_UPLOAD_TYPE]: fileUploadSchema,
    [SOUND_CLOUD_TYPE]: soundCloudSchema,
    [MAP_TYPE]: mapSchema,
    [BUTTON_TYPE]: buttonSchema,
    [HTML_TYPE]: htmlSchema,
    [LINK_TYPE]: linkSchema,
    [ANCHOR_TYPE]: anchorSchema,
    [GALLERY_TYPE]: gallerySchema,
    [MENTION_TYPE]: mentionsSchema,
  });
  return validate(payload, schema);
};
