/* eslint-disable no-param-reassign */
export function markdownRenderer(targetConstructor) {
  targetConstructor.prototype.renderMarkdown = content => (`
    <mark-down>
       ${content}
    </mark-down>
  `);
}

export function onAttributesChangeRenderer(attributes) {
  return function decorator(targetConstructor) {
    Object.defineProperty(targetConstructor, 'observedAttributes', {
      get() {
        return attributes;
      }
    });
    const proto = targetConstructor.prototype;
    proto.attributeChangedCallback = function callback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    };
    proto.init = function init() {
      this.attachShadow({ mode: 'open' });
      this.render();
    };
  };
}
