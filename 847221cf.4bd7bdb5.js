(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{135:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return m})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return h}));var s=n(2),i=n(6),o=(n(0),n(160)),a=n(488),r=n(500),c=n(501),d=(n(95),n(96),n(136),n(250)),l=n(502),m={id:"adding-a-viewer",title:"Introducing the rich content viewer",sidebar_label:"Add a viewer"},p={id:"ricos/adding-a-viewer",title:"Introducing the rich content viewer",description:"Now that you have an editor, let's add a viewer to display the content it creates.",source:"@site/docs/ricos/adding-a-viewer.mdx",permalink:"/rich-content/docs/ricos/adding-a-viewer",sidebar_label:"Add a viewer",sidebar:"ricos",previous:{title:"Quick Start",permalink:"/rich-content/docs/ricos/quick-start"},next:{title:"Migrating from rich-content",permalink:"/rich-content/docs/ricos/migrating-from-rich-content"}},u=[],g={rightToc:u};function h(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(s.a)({},g,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Now that you have an editor, let's add a viewer to display the content it creates."),Object(o.b)("pre",null,Object(o.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"npm i ricos-viewer\n")),Object(o.b)("pre",null,Object(o.b)("code",Object(s.a)({parentName:"pre"},{className:"language-jsx"}),"import { RicosViewer } from 'ricos-viewer';\nimport 'ricos-viewer/dist/styles.min.css';\n\nconst content = {\n  blocks: [\n    {\n      key: 'd79aa',\n      text: \"Hi there! I'm Ricos, your rich content framework. \ud83d\udc7e\",\n      type: 'header-two',\n      depth: 0,\n      inlineStyleRanges: [],\n      entityRanges: [],\n      data: {},\n    },\n  ],\n  entityMap: {},\n  VERSION: '7.5.0',\n};\n\n<RicosViewer content={content} />;\n")),Object(o.b)("div",{className:"card"},Object(o.b)(a.a,{content:d,mdxType:"RicosViewer"})),Object(o.b)("p",null,"Now let's add some plugins to Ricos and display the new content."),Object(o.b)("pre",null,Object(o.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"npm i wix-rich-content-plugin-video wix-rich-content-plugin-divider\n")),Object(o.b)("pre",null,Object(o.b)("code",Object(s.a)({parentName:"pre"},{className:"language-jsx"}),"import { RicosViewer } from 'ricos-viewer';\nimport 'ricos-viewer/dist/styles.min.css';\n\nimport { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';\nimport 'wix-rich-content-plugin-video/dist/styles.min.css';\n\nimport { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer.cjs';\nimport 'wix-rich-content-plugin-divider/dist/styles.min.css';\n\n<RicosViewer content={contentWithPlugins} plugins={[pluginDivider(), pluginVideo()]} />;\n")),Object(o.b)("div",{className:"card"},Object(o.b)(a.a,{content:l,plugins:[Object(r.pluginDivider)(),Object(c.pluginVideo)()],mdxType:"RicosViewer"})))}h.isMDXComponent=!0},249:function(e,t,n){var s={"./messages_ar.json":[331,70],"./messages_bg.json":[332,71],"./messages_cs.json":[333,72],"./messages_da.json":[334,73],"./messages_de.json":[335,74],"./messages_el.json":[336,75],"./messages_en.json":[178],"./messages_es.json":[337,76],"./messages_fi.json":[338,77],"./messages_fr.json":[339,78],"./messages_he.json":[340,79],"./messages_hi.json":[341,80],"./messages_hu.json":[342,81],"./messages_id.json":[343,82],"./messages_it.json":[344,83],"./messages_ja.json":[345,84],"./messages_ko.json":[346,85],"./messages_lt.json":[347,86],"./messages_ms.json":[348,87],"./messages_nl.json":[349,88],"./messages_no.json":[350,89],"./messages_pl.json":[351,90],"./messages_pt.json":[352,91],"./messages_ro.json":[353,92],"./messages_ru.json":[354,93],"./messages_sv.json":[355,94],"./messages_th.json":[356,95],"./messages_tl.json":[357,96],"./messages_tr.json":[358,97],"./messages_uk.json":[359,98],"./messages_zh.json":[360,99]};function i(e){if(!n.o(s,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=s[e],i=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n.t(i,3)}))}i.keys=function(){return Object.keys(s)},i.id=249,e.exports=i},250:function(e){e.exports=JSON.parse('{"blocks":[{"key":"d79aa","text":"Hi there! I\'m Ricos, your rich content framework. \ud83d\udc7e","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{},"VERSION":"7.5.0"}')},502:function(e){e.exports=JSON.parse('{"blocks":[{"key":"d79aa","text":"Hi there! I\'m Ricos, your rich content framework. \ud83d\udc7e","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fnevk","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"8o7bs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6dc41","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"2ke8","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"wix-draft-plugin-divider","mutability":"IMMUTABLE","data":{"type":"single","config":{"size":"large","alignment":"center","textWrap":"nowrap"}}},"1":{"type":"wix-draft-plugin-video","mutability":"IMMUTABLE","data":{"config":{"size":"content","alignment":"center"},"tempData":false,"src":"https://youtu.be/oCBpJkG6ngE","metadata":{"version":"1.0","thumbnail_url":"https://i.ytimg.com/vi/jhXlnvYZZQs/hqdefault.jpg","provider_url":"https://www.youtube.com/","thumbnail_height":360,"provider_name":"YouTube","width":480,"title":"Wix.com Official 2018 Big Game Ad with Rhett & Link \u2014 Extended Version","author_url":"https://www.youtube.com/user/Wix","html":"<iframe width=\\"480\\" height=\\"270\\" src=\\"https://www.youtube.com/embed/jhXlnvYZZQs?feature=oembed\\" frameborder=\\"0\\" allow=\\"autoplay; encrypted-media\\" allowfullscreen></iframe>","height":270,"author_name":"Wix.com","thumbnail_width":480,"type":"video","video_url":"https://youtu.be/jhXlnvYZZQs"}}}},"VERSION":"7.5.0"}')}}]);