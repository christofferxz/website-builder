import { attachContext, attachDrag } from "./interactions/index.js";
import { renderComponent } from "./renderers/index.js"

export class BuilderEngine {
  constructor(canvasEl, document, callbacks = {}) {
    this.canvasEl = canvasEl;
    this.document = document;
    this.nodeEls = new Map();

    // callbacks
    this.onContext = callbacks.onContext;
  };

  init() {
    // this.canvasEl.innerHTML = "";
    this.nodeEls.clear();
    this.document.nodes.forEach((node) => {
      this.render(node);
    });
  };

  render(node) {
    const el = renderComponent(node);
    this.canvasEl.appendChild(el);
    this.nodeEls.set(String(node.id), el);

    attachDrag(el, String(node.id), this);
    attachContext(el, String(node.id), this);
  };

  findNodeElement(nodeId) {
    const element = this.canvasEl.querySelector(`[data-node-id="${nodeId}"]`);

    if (!element) {
      return console.log('[error#findNodeElement => Node element not found...');
    } else {
      return element;
    };
  };

  findNode(nodeId) {
    const node = this.document.nodes.find(n => String(n.id) === String(nodeId));

    if (!node) {
      return console.log('[error#findNode] => Node not found...');
    } else {
      return node;
    };
  };

  patchNodeLayout(nodeId, patch) {
    const node = this.findNode(nodeId);
    if (!node) return;

    Object.assign(node.layout, patch);

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

    const el = this.nodeEls.get(String(nodeId));
    if (!el) return console.log("[error#patchNodeLayout] => Element not found...");

    if (patch.x != null) el.style.left = `${node.layout.x}px`
    if (patch.y != null) el.style.top  = `${node.layout.y}px`
    if (patch.height != null) el.style.height = `${node.layout.height}px`
    if (patch.width != null) el.style.width  = `${node.layout.width}px`
  };

  nextNodeId() {
    const ids = this.document.nodes.map(n => Number(n.id) || 0);
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  addNode({ type, layout = {}, props = {} }) {
    const id = this.nextNodeId();

    const node = {
      id,
      type,
      layout: {
        x: layout.x ?? 0,
        y: layout.y ?? 0,
        width: layout.width ?? 100,
        height: layout.height ?? 100,
        rotation: 0,
        z: this.document.nodes.length + 1
      },
      props
    };

    this.document.nodes.push(node);
    this.render(node);
  };

  removeNode(nodeId) {
    const node = this.findNode(nodeId)
    if (!node) return;

    const nodeElement = this.findNodeElement(nodeId);
    nodeElement.remove();
    this.document.nodes = this.document.nodes.filter(el => el.id !== node.id);
  };

  triggerContext(nodeId, event) {
    if (!this.onContext) return;

    this.onContext({
      nodeId,
      x: event.clientX,
      y: event.clientY
    });
  };
};
