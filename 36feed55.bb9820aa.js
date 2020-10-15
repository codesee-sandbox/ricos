(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{130:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),p=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},s=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,l=d(e,["components","mdxType","originalType","parentName"]),u=p(n),s=r,h=u["".concat(a,".").concat(s)]||u[s]||b[s]||o;return n?i.a.createElement(h,c(c({ref:t},l),{},{components:n})):i.a.createElement(h,c({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=s;var c={};for(var d in t)hasOwnProperty.call(t,d)&&(c[d]=t[d]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<o;l++)a[l]=n[l];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},75:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return d})),n.d(t,"default",(function(){return p}));var r=n(2),i=n(6),o=(n(0),n(130)),a={id:"RichContentEditorAPI",title:"RichContentEditor API",sidebar_label:"RichContentEditor API"},c={unversionedId:"rce_api/RichContentEditorAPI",id:"rce_api/RichContentEditorAPI",isDocsHomePage:!1,title:"RichContentEditor API",description:"Introduction",source:"@site/docs/rce_api/RichContentEditorApi.mdx",slug:"/rce_api/RichContentEditorAPI",permalink:"/rich-content/docs/rce_api/RichContentEditorAPI",version:"current",sidebar_label:"RichContentEditor API",sidebar:"api",previous:{title:"File Upload Plugin",permalink:"/rich-content/docs/plugins_api/FileUploadPlugin"},next:{title:"Toolbar Customization",permalink:"/rich-content/docs/rce_api/ToolbarCustomization"}},d=[{value:"Introduction",id:"introduction",children:[]},{value:"<code>handleReturn</code>",id:"handlereturn",children:[]},{value:"<code>config</code>",id:"config",children:[]},{value:"<code>shouldRenderOptimizedImages</code>",id:"shouldrenderoptimizedimages",children:[]}],l={rightToc:d};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"introduction"},"Introduction"),Object(o.b)("p",null,"This document describes the ",Object(o.b)("inlineCode",{parentName:"p"},"RichContentEditor")," API."),Object(o.b)("h2",{id:"handlereturn"},Object(o.b)("inlineCode",{parentName:"h2"},"handleReturn")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"handleReturn")," prop determines editor behavior upon Enter key press."),Object(o.b)("p",null,"The prop value is expected to be a function with the following signature:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"\n(updateEditorStateCallback: Function) =>\n  (e: SyntheticKeyboardEvent, editorState: EditorState) => 'handled' | 'not-handled'\n\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"updateEditorStateCallback")," parameter can be used for ",Object(o.b)("inlineCode",{parentName:"p"},"editorState")," update. It accepts a single parameter ",Object(o.b)("inlineCode",{parentName:"p"},"editorState"),"."),Object(o.b)("p",null,"The return value is a function that is used as the ",Object(o.b)("inlineCode",{parentName:"p"},"draft-js")," ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://draftjs.org/docs/api-reference-editor#handlereturn"}),"handleReturn cancellable handler"),". It should return either ",Object(o.b)("inlineCode",{parentName:"p"},"handled")," or ",Object(o.b)("inlineCode",{parentName:"p"},"not-handled")," string. The ",Object(o.b)("inlineCode",{parentName:"p"},"'handled'")," value indicates that the event is handled and the Draft core should do nothing more with it. By returning ",Object(o.b)("inlineCode",{parentName:"p"},"'not-handled'"),", you defer to Draft to handle the event. For example, the ",Object(o.b)("inlineCode",{parentName:"p"},"() => 'handled'")," will cause the editor to completely ignore the Enter key press."),Object(o.b)("h2",{id:"config"},Object(o.b)("inlineCode",{parentName:"h2"},"config")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"config")," prop allow to customize various aspects of the ",Object(o.b)("inlineCode",{parentName:"p"},"RichContentEditor"),", such as ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/rich-content/docs/rce_api/ToolbarCustomization"}),"toolbars"),", ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/rich-content/docs/rce_api/UiSettings"}),"common UI settings"),", and ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/rich-content/docs/plugins_api/PluginCustomization"}),"plugins"),"."),Object(o.b)("h2",{id:"shouldrenderoptimizedimages"},Object(o.b)("inlineCode",{parentName:"h2"},"shouldRenderOptimizedImages")),Object(o.b)("p",null,"When true, images will be rendered in high resolution. Useful for forcing high resolution rendering for crawlers relevant to SEO."))}p.isMDXComponent=!0}}]);