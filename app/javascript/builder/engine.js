import { attachDrag } from "./interactions/index.js";
import { renderComponent } from "./renderers/index.js"

export class BuilderEngine {
  constructor(canvasEl, document) {
    this.canvasEl = canvasEl;
    this.document = document;
    this.nodeEls = new Map();
  };

  render() {
    this.canvasEl.innerHTML = "";
    this.nodeEls.clear();

    this.document.nodes.forEach((node) => {
      const el = renderComponent(node);
      this.canvasEl.appendChild(el);
      this.nodeEls.set(String(node.id), el);

      attachDrag(el, String(node.id), this);
    });
  };

  findNode(nodeId) {
    return this.document.nodes.find(n => String(n.id) === String(nodeId));
  };

  patchNodeLayout(nodeId, patch) {
    const node = this.findNode(nodeId);
    if (!node) return;

    // (start) mudar isso para outro lugar
    // adicionar validacoes
    const minWidth = 10;
    const minHeight = 10;

    if (patch.x != null) node.layout.x = patch.x;
    if (patch.y != null) node.layout.y = patch.y;

    if (patch.width != null)
      node.layout.width = Math.max(minWidth, patch.width);

    if (patch.height != null)
      node.layout.height = Math.max(minHeight, patch.height);
    // (end)

    Object.assign(node.layout, patch);

    const el = this.nodeEls.get(String(nodeId));
    if (el) {
      if (patch.x != null) el.style.left = `${node.layout.x}px`
      if (patch.y != null) el.style.top  = `${node.layout.y}px`
      if (patch.height != null) el.style.height = `${node.layout.height}px`
      if (patch.width != null) el.style.width  = `${node.layout.width}px`
    };
  }
};
