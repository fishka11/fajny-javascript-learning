export function markdownRenderer(targetConstructor) {
  // eslint-disable-next-line no-param-reassign
  targetConstructor.prototype.renderMarkdown = content => (`
    <mark-down>
       ${content}
    </mark-down>
  `);
}
