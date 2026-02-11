import { attachDrag } from "./interactions/index.js";
import { renderComponent } from "./renderers/index.js"

export class BuilderEngine {
  constructor(canvasEl, document) {
    this.canvasEl = canvasEl;
    this.document = document;
    this.nodeEls = new Map();
    this.dragState = null;
  };

  render() {
    this.canvasEl.innerHTML = " ";
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

  startDrag(nodeId, e) {
    const node = this.findNode(nodeId);
    if (!node) return;

    this.dragState = {
      nodeId: String(nodeId),
      startMouse: { x: e.clientX, y: e.clientY },
      startLayout: { ...node.layout },
    };

    window.addEventListener("pointermove", this.onDragMove);
    window.addEventListener("pointerup", this.onDragEnd, { once: true });
  };

  onDragMove = (e) => {
    if (!this.dragState) return;

    const { nodeId, startMouse, startLayout } = this.dragState;
    const dx = e.clientX - startMouse.x;
    const dy = e.clientY - startMouse.y;

    const node = this.findNode(nodeId);
    node.layout.x = startLayout.x + dx;
    node.layout.y = startLayout.y + dy;

    const el = this.nodeEls.get(nodeId);
    if (el) {
      el.style.left = `${node.layout.x}px`;
      el.style.top  = `${node.layout.y}px`;
    }
  };

  onDragEnd = () => {
    window.removeEventListener("pointermove", this.onDragMove);
    this.dragState = null;
  };
};
