import 'wix-rich-content-plugin-line-spacing/dist/styles.min.css';
import { pluginLineSpacing } from 'ricos/line-spacing/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginLineSpacing());
