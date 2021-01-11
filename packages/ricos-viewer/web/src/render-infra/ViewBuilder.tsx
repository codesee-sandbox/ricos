import { ReactElement } from 'react';

export class ViewBuilder {
  view: { content: string | ReactElement; type: 'html' | 'element' }[];
  constructor() {
    this.view = [];
  }

  addHtmlNode(html: string) {
    this.view.push({ content: html, type: 'html' });
    return this;
  }

  addReactNode(element: ReactElement) {
    this.view.push({ content: element, type: 'element' });
    return this;
  }

  appendHtml(html: string) {
    const lastItem = this.view[this.view.length - 1];
    if (lastItem.type === 'html') {
      lastItem.content = `${lastItem.content}${html}`;
    } else {
      this.addHtmlNode(html);
    }
    return this;
  }

  getView() {
    return this.view;
  }
}
