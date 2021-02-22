import React, { PureComponent } from 'react';
import windowContentStateHoc from '../WindowContentStateHoc';
import { RichContentEditor } from 'ricos/editor';
import { RicosEditor, RicosEditorProps } from 'ricos/editor';
import { RicosViewer } from 'ricos/viewer';
import { default as editorPlugins } from './editorPlugins';
import { default as viewerPlugins } from './viewerPlugins';
import './styles.global.scss';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import theme from '../../../../../examples/main/shared/theme/theme';
import { testVideos } from '../../../../../examples/main/shared/utils/mock';
import { TestAppConfig } from '../../../../../examples/main/src/types';
import {
  mockTestImageUpload,
  mockTestImageNativeUpload,
  mockTestFileUpload,
  mockTestFileNativeUpload,
} from '../../../../../examples/main/shared/utils/fileUploadUtil';
import { createPreview } from 'ricos/preview';
import { TextSelectionToolbar, TwitterButton } from 'ricos/text-selection-toolbar';
import { TOOLBARS } from 'ricos/editor-common';
import { ricosPalettes } from '../../../../tests/resources/palettesExample';
import { themes } from '../consumersThemes/themes';
import { PaletteColors, RicosContent, SEOSettings } from 'ricos/common';
import { EditorState } from '@wix/draft-js';
import { merge } from 'lodash';

const onVideoSelected = (url: string, updateEntity) => {
  setTimeout(() => updateEntity(testVideos[1]), 1);
};
const determinePalette = (paletteType: 'light' | 'dark', fallbackColor?: string): PaletteColors =>
  paletteType
    ? merge(paletteType === 'light' ? ricosPalettes[1] : ricosPalettes[9], { fallbackColor })
    : undefined;
const setBackground = (palette: PaletteColors, disableContainer: boolean) =>
  !disableContainer && palette ? { backgroundColor: palette.bgColor } : {};
const setForeground = (palette: PaletteColors) => (palette ? { color: palette.textColor } : {});
const customStyles = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'quote',
  'link',
  'hashtag',
  'button',
].reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: {
      fontFamily: 'Times',
      fontSize: '40px',
      color: 'orange',
      fontStyle: 'italic',
      textDecoration: 'underline',
      fontWeight: 'bold',
      lineHeight: '40px',
      minHeight: '40px',
      borderColor: 'brown',
    },
  }),
  {}
);

interface RicosTestAppProps {
  isMobile: boolean;
  locale?: string;
  contentState?: RicosContent;
  editorState?: EditorState;
  localeResource?: Record<string, string>;
  onRicosEditorChange?: RicosEditorProps['onChange'];
  seoMode?: SEOSettings;
  testAppConfig?: TestAppConfig;
}

class RicosTestApp extends PureComponent<RicosTestAppProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewerRef: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
  }

  renderEditor = () => {
    const { contentState, onRicosEditorChange, locale, isMobile, testAppConfig = {} } = this.props;
    const { addPluginMenuConfig, footerToolbarConfig } = testAppConfig.toolbarConfig || {};
    const { skipCssOverride, paletteType, useCustomStyles, fallbackColor } =
      testAppConfig.theme || {};
    const { consumer } = testAppConfig;
    const consumerThemeConfig = { isViewer: false, isSeo: false, isMobile };
    const consumerTheme = themes[consumer]?.(consumerThemeConfig);
    const palette = determinePalette(paletteType, fallbackColor);
    const isNativeUpload = testAppConfig?.isNativeUpload;

    const createToolbarSettings = (addPluginMenuConfig, footerToolbarConfig) => ({
      getToolbarSettings: () => [
        { name: TOOLBARS.SIDE, addPluginMenuConfig },
        {
          name: TOOLBARS.MOBILE,
          addPluginMenuConfig,
        },
        { name: TOOLBARS.FOOTER, footerToolbarConfig },
      ],
    });

    const uploadHandler = isNativeUpload
      ? {
          onFileSelected: mockTestFileNativeUpload,
        }
      : {
          handleFileSelection: mockTestFileUpload,
        };
    const nativeFileUploadConfig = {
      fileUpload: uploadHandler,
    };

    const externalPluginsConfigs = { ...testAppConfig.pluginsConfig, ...nativeFileUploadConfig };

    return (
      <RicosEditor
        plugins={editorPlugins(testAppConfig.plugins, externalPluginsConfigs)}
        placeholder={'Add some text!'}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        theme={{ palette, customStyles: useCustomStyles ? customStyles : {} }}
        cssOverride={consumerTheme ? consumerTheme : !skipCssOverride && theme}
        toolbarSettings={createToolbarSettings(addPluginMenuConfig, footerToolbarConfig)}
        onChange={onRicosEditorChange}
      >
        <RichContentEditor
          helpers={{
            onVideoSelected,
            handleFileSelection: !isNativeUpload ? mockTestImageUpload : undefined,
            handleFileUpload: isNativeUpload ? mockTestImageNativeUpload : undefined,
          }}
        />
      </RicosEditor>
    );
  };

  renderViewer = () => {
    const { isMobile, contentState, locale, seoMode, testAppConfig = {} } = this.props;
    const { skipCssOverride, paletteType, useCustomStyles, fallbackColor } =
      testAppConfig.theme || {};
    const { consumer } = testAppConfig;
    const consumerThemeConfig = { isViewer: true, isSeo: seoMode, isMobile };
    const consumerTheme = themes[consumer]?.(consumerThemeConfig);
    const palette = determinePalette(paletteType, fallbackColor);
    return (
      <RicosViewer
        plugins={viewerPlugins(testAppConfig.plugins)}
        content={contentState}
        isMobile={isMobile}
        locale={locale}
        theme={{ palette, customStyles: useCustomStyles ? customStyles : {} }}
        cssOverride={consumerTheme ? consumerTheme : !skipCssOverride && theme}
        seoSettings={seoMode}
        preview={testAppConfig.showDefaultPreview && createPreview()}
      />
    );
  };

  render() {
    const { isMobile, testAppConfig = {} } = this.props;
    const { theme: { paletteType, disableContainer } = {}, applyOuterStyle } = testAppConfig;
    const palette = determinePalette(paletteType);
    const addStyle = applyOuterStyle
      ? { color: 'white', fontFamily: 'Times', backgroundColor: 'black' }
      : {};
    return (
      <div
        className={`testApp ${isMobile ? 'mobile' : ''}`}
        style={{ ...setBackground(palette, disableContainer), ...addStyle }}
      >
        <div>
          <h3 style={setForeground(palette)}>Editor</h3>
          <div className="rcWrapper rce" id="RicosEditorContainer" data-hook="ricos-editor">
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3 style={setForeground(palette)}>Viewer</h3>
          <div
            className="rcWrapper rcv"
            id="RicosViewerContainer"
            data-hook="ricos-viewer"
            ref={this.viewerRef}
          >
            {this.renderViewer()}
            <TextSelectionToolbar container={this.viewerRef.current}>
              {selectedText => <TwitterButton selectedText={selectedText} />}
            </TextSelectionToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default windowContentStateHoc(RicosTestApp);
